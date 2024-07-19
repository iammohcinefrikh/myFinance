const handleResponse = require("../helpers/handleResponseHelper");
const User = require("../models/userModel");

const subscribe = async (request, response) => {
  try {
    const { userId } = request.body;

    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return handleResponse(response, 404, "error", "Not Found", "Compte d'utilisateur introuvable");
    }

    else if (existingUser.isSubscribed) {
      return handleResponse(response, 409, "error", "Conflict", "L'utilisateur est déjà abonné à la newsletter");
    }

    const userData = {
      isSubscribed: true
    }

    await User.findByIdAndUpdate(userId, userData);

    handleResponse(response, 200, "success", "OK", "L'utilisateur s'est bien inscrit à la newsletter");
  }

  catch (error) {
    handleResponse(response, 500, "error", "Internal Server Error", "Une erreur s'est produite lors de l'inscription de l'utilisateur à la newsletter");
  }
}

const unsubscribe = async (request, response) => {
  try {
    const { userId } = request.body;

    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return handleResponse(response, 404, "error", "Not Found", "Compte d'utilisateur introuvable");
    }

    else if (!existingUser.isSubscribed) {
      return handleResponse(response, 409, "error", "Conflict", "L'utilisateur s'est déjà désabonné de la newsletter");
    }

    const userData = {
      isSubscribed: true
    }

    await User.findByIdAndUpdate(userId, userData);

    handleResponse(response, 200, "success", "OK", "L'utilisateur s'est désabonné de la newsletter");
  }

  catch (error) {
    handleResponse(response, 500, "error", "Internal Server Error", "Une erreur s'est produite lors de la désinscription de l'utilisateur de la newsletter");
  }
}

module.exports = { subscribe, unsubscribe };