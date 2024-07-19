const Joi = require("joi");

const updateProfileSchema = Joi.object({
  profileMonthlyBudget: Joi.number()
  .min(1)
  .required()
  .messages({
    "string.empty": "Le budget mensuel ne doit pas être vide",
    "string.min": "Le budget mensuel ne doit pas être inférieur à 0DH",
    "any.required": "Le budget mensuel est requis"
  }),
  profileUtilitiesBudget: Joi.number()
  .min(0)
  .required()
  .messages({
    "string.empty": "Le budget des utilitaires ne doit pas être vide",
    "string.min": "Le budget des utilitaires ne doit pas être inférieur à 0DH",
    "any.required": "Le budget des utilitaires est requis"
  }),
  profileGroceriesBudget: Joi.number()
  .min(0)
  .required()
  .messages({
    "string.empty": "Le budget d'épicerie ne doit pas être vide",
    "string.min": "Le budget d'épicerie ne doit pas être inférieur à 0DH",
    "any.required": "Le budget d'épicerie est requis"
  }),
  profileHousingBudget: Joi.number()
  .min(0)
  .required()
  .messages({
    "string.empty": "Le budget du logement ne doit pas être vide",
    "string.min": "Le budget du logement ne doit pas être inférieur à 0DH",
    "any.required": "Le budget du logement est requis"
  }),
  profileTransportBudget: Joi.number()
  .min(0)
  .required()
  .messages({
    "string.empty": "Le budget des transports ne doit pas être vide",
    "string.min": "Le budget des transports ne doit pas être inférieur à 0DH",
    "any.required": "Le budget des transports est requis"
  }),
  profileHealthBudget: Joi.number()
  .min(0)
  .required()
  .messages({
    "string.empty": "Le budget de santé ne doit pas être vide",
    "string.min": "Le budget de santé ne doit pas être inférieur à 0DH",
    "any.required": "Le budget de santé est requis"
  }),
  profileEducationBudget: Joi.number()
  .min(0)
  .required()
  .messages({
    "string.empty": "Le budget de l'éducation ne doit pas être vide",
    "string.min": "Le budget de l'éducation ne doit pas être inférieur à 0DH",
    "any.required": "Le budget de l'éducation est requis"
  }),
  profileHobbiesBudget: Joi.number()
  .min(0)
  .required()
  .messages({
    "string.empty": "Le budget de loisirs ne doit pas être vide",
    "string.min": "Le budget de loisirs ne doit pas être inférieur à 0DH",
    "any.required": "Le budget de loisirs est requis"
  }),
  profileSavingsBudget: Joi.number()
  .min(0)
  .required()
  .messages({
    "string.empty": "Le budget d'épargne ne doit pas être vide",
    "string.min": "Le budget d'épargne ne doit pas être inférieur à 0DH",
    "any.required": "Le budget d'épargne est requis"
  }),
  profileMiscellaneousBudget: Joi.number()
  .min(0)
  .required()
  .messages({
    "string.empty": "Le budget divers ne doit pas être vide",
    "string.min": "Le budget divers ne doit pas être inférieur à 0DH",
    "any.required": "Le budget divers est requis"
  })
});

module.exports = updateProfileSchema;