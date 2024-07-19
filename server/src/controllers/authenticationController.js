const User = require("../models/userModel");
const Profile = require("../models/profileModel"); 
const registerSchema = require("../schemas/registerSchema");
const loginSchema = require("../schemas/loginSchema");
const hashPassword = require("../utils/hashPasswordUtil");
const handleResponse = require("../helpers/handleResponseHelper");
const verifyPassword = require("../utils/verifyPasswordUtil");
const generateToken = require("../utils/generateTokenUtil");


const register = async (request, response) => {
  try {
    const { userFirstName, userLastName, userEmail, userPassword, isSubscribed } = request.body;

    const { error } = registerSchema.validate({ userFirstName: userFirstName, userLastName: userLastName, userEmail: userEmail, userPassword: userPassword, isSubscribed: isSubscribed });

    if (error) {
      return handleResponse(response, 400, "error", "Bad Request", error.details[0].message);
    }

    const existingUser = await User.findOne({ userEmail });

    if (existingUser) {
      return handleResponse(response, 409, "error", "Conflict", "Cet email est déjà enregistré");
    }

    else {
      const hashedPassword = hashPassword(userPassword);

      const newUser = new User({
        userFirstName: userFirstName,
        userLastName: userLastName,
        userEmail: userEmail,
        userPassword: hashedPassword,
        isSubscribed: isSubscribed
      });

      const savedUser = await newUser.save();

      const newProfile = new Profile({
        userId: savedUser._id,
        profileMonthlyBudget: null,
        profileUtilitiesBudget: null,
        profileGroceriesBudget: null,
        profileHousingBudget: null,
        profileTransportBudget: null,
        profileHealthBudget: null,
        profileEducationBudget: null,
        profileHobbiesBudget: null,
        profileSavingsBudget: null,
        profileOtherBudget: null
      });

      await newProfile.save();

      handleResponse(response, 201, "success", "Created", "L'utilisateur s'est enregistré avec succès");
    }
  }

  catch (error) {
    handleResponse(response, 500, "error", "Internal Server Error", "Une erreur s'est produite lors de l'enregistrement de l'utilisateur");
  }
}

const login = async (request, response) => {
  try {
    const { userEmail, userPassword} = request.body;

    const { error } = loginSchema.validate({ userEmail: userEmail, userPassword: userPassword });

    if (error) {
      return handleResponse(response, 400, "error", "Bad Request", error.details[0].message);
    }

    const existingUser = await User.findOne({ userEmail });

    if (!existingUser) {
      return handleResponse(response, 404, "error", "Not Found", "Compte d'utilisateur introuvable");
    }

    else {
      const isPasswordValid = verifyPassword(userPassword, existingUser.userPassword);

      if (!isPasswordValid) {
        return handleResponse(response, 403, "error", "Forbidden", "Identifiants de connexion invalides");
      }

      else {
        response.status(200).json({
          "statusCode": 200,
          "success": "OK",
          "message": "Connexion réussie",
          "token": generateToken(userEmail, process.env.JWT_SECRET)
        });
      }
    }
  }

  catch (error) {
    handleResponse(response, 500, "error", "Internal Server Error", "Une erreur s'est produite lors de la connexion de l'utilisateur");
  }
}

module.exports = { register, login };