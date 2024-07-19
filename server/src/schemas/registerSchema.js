const Joi = require("joi");

const registerSchema = Joi.object({
  userFirstName: Joi.string()
  .min(2)
  .max(35)
  .required()
  .messages({
    "string.empty": "Le prénom ne peut pas être vide",
    "string.min": "Le prénom doit contenir au moins 2 caractères",
    "string.max": "Le prénom ne peut pas dépasser 35 caractères",
    "any.required": "Le prénom est requis"
  }),
  userLastName: Joi.string()
  .min(2)
  .max(35)
  .required()
  .messages({
    "string.empty": "Le nom ne peut pas être vide",
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "string.max": "Le nom ne peut pas dépasser 35 caractères",
    "any.required": "Le nom est requis"
  }),
  userEmail: Joi.string()
  .email()
  .required()
  .messages({
    "string.empty": "L'email ne peut pas être vide",
    "string.email": "Veuillez saisir une adresse email valide",
    "any.required": "L'email est requis"
  }),
  userPassword: Joi.string()
  .pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'))
  .required()
  .messages({
    "string.empty": "Le mot de passe ne peut pas être vide",
    "string.pattern.base": "Le mot de passe doit contenir au moins 8 caractères, y compris une lettre majuscule, une minuscule, un chiffre et un caractère spécial.",
    "any.required": "Le mot de passe est requis"
  }),
  isSubscribed: Joi.boolean()
  .required()
  .messages({
    "any.required": "Le statut d'abonnement à la newsletter est requis"
  })
});

module.exports = registerSchema;