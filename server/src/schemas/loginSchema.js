const Joi = require("joi");

const loginSchema = Joi.object({
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
  })
});

module.exports = loginSchema;