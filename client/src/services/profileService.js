import axios from "axios";

const getProfile = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/profile");

    if (response?.data?.statusCode === 200) {
      return response?.data;
    }
  }
  
  catch (error) {
    if (!error?.response) {
      alert("Aucune réponse n'est reçue du serveur");
    }

    else {
      alert(error?.response?.data?.message);
    }
  }
}

const updateProfile = async (formData) => {
  try {
    const response = await axios.put("http://localhost:8080/api/v1/profile", {
        profileMonthlyBudget: formData.profileMonthlyBudget,
        profileUtilitiesBudget: formData.profileUtilitiesBudget,
        profileGroceriesBudget: formData.profileGroceriesBudget,
        profileHousingBudget: formData.profileHousingBudget,
        profileTransportBudget: formData.profileTransportBudget,
        profileHealthBudget: formData.profileHealthBudget,
        profileEducationBudget: formData.profileEducationBudget,
        profileHobbiesBudget: formData.profileHobbiesBudget,
        profileSavingsBudget: formData.profileSavingsBudget,
        profileMiscellaneousBudget: formData.profileMiscellaneousBudget
    });

    if (response?.data?.statusCode === 201) {
      return true;
    }
  }

  catch (error) {
    if (!error?.response) {
      alert("Aucune réponse n'est reçue du serveur");
    }
    
    else {
      alert(error?.response?.data?.message);
    }

    return false;
  }
}

export { getProfile, updateProfile };