const handleResponse = require("../helpers/handleResponseHelper");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const updateProfileSchema = require("../schemas/updateProfileSchema");

const getProfile = async (request, response) => {
  try {
    const userEmail = request.user.email;

    const existingUser = await User.findOne({ userEmail });

    if (!existingUser) {
      return handleResponse(response, 404, "error", "Not Found", "Compte d'utilisateur introuvable");
    }

    const existingProfile = await Profile.findOne({ userId: existingUser._id });

    if (!existingProfile) {
      return handleResponse(response, 404, "error", "Not Found", "Profile d'utilisateur introuvable");
    }

    response.status(200).json({
      "statusCode": 200,
      "success": "OK",
      "message": "Profil récupéré avec succès",
      "profile": existingProfile
    });
  }

  catch (error) {
    handleResponse(response, 500, "error", "Internal Server Error", "Une erreur s'est produite lors de la recherche de profil");
  }
}

const updateProfile = async (request, response) => {
  try {
    const { profileMonthlyBudget, profileUtilitiesBudget, profileGroceriesBudget, profileHousingBudget, profileTransportBudget, profileHealthBudget, profileEducationBudget, profileHobbiesBudget, profileSavingsBudget, profileMiscellaneousBudget} = request.body;
    const userEmail = request.user.email;

    const { error } = updateProfileSchema.validate({ profileMonthlyBudget: profileMonthlyBudget, profileUtilitiesBudget: profileUtilitiesBudget, profileGroceriesBudget: profileGroceriesBudget, profileHousingBudget: profileHousingBudget, profileTransportBudget: profileTransportBudget, profileHealthBudget: profileHealthBudget, profileEducationBudget: profileEducationBudget, profileHobbiesBudget: profileHobbiesBudget, profileSavingsBudget: profileSavingsBudget,  profileMiscellaneousBudget: profileMiscellaneousBudget });

    if (error) {
      return handleResponse(response, 400, "error", "Bad Request", error.details[0].message);
    }

    const existingUser = await User.findOne({ userEmail });

    if (!existingUser) {
      return handleResponse(response, 404, "error", "Not Found", "Compte d'utilisateur introuvable");
    }

    const existingProfile = await Profile.findOne({ userId: existingUser._id });

    if (!existingProfile) {
      return handleResponse(response, 404, "error", "Not Found", "Profile d'utilisateur introuvable");
    }

    await Profile.findOneAndUpdate(
      { userId: existingUser._id },
      {
        $set: {
          profileMonthlyBudget,
          profileUtilitiesBudget,
          profileGroceriesBudget,
          profileHousingBudget,
          profileTransportBudget,
          profileHealthBudget,
          profileEducationBudget,
          profileHobbiesBudget,
          profileSavingsBudget,
          profileMiscellaneousBudget
        }
      },
      { new: false }
    );

    handleResponse(response, 201, "success", "Created", "Profil mis à jour avec succès");
  }

  catch (error) {
    console.error(error)
    handleResponse(response, 500, "error", "Internal Server Error", "Une erreur s'est produite lors de la mise à jour du profil de l'utilisateur");
  }
}

module.exports = { getProfile, updateProfile };