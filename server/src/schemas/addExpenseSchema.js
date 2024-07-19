const Joi = require("joi");

const addExpenseSchema = Joi.object({
  expenseName: Joi.string()
  .min(4)
  .required()
  .messages({
    "string.empty": "Le nom de la dépense ne peut pas être vide",
    "string.min": "Le nom de la dépense doit contenir au moins 4 caractères",
    "any.required": "Le nom de la dépense est requis"
  }),
  expenseAmount: Joi.number()
  .min(1)
  .required()
  .messages({
    "string.empty": "Le montant de la dépense ne peut pas être vide",
    "string.min": "Le montant de la dépense ne doit pas être inférieur à 1DH",
    "any.required": "Le montant de la dépense est requis"
  }),
  expenseDate: Joi.date()
  .iso()
  .required()
  .messages({
    "date.format": "Le format de la date de la dépense n'est pas valide",
    "any.required": "La date de la dépense est requis"
  }),
  expenseCategory: Joi.string()
    .required()
    .messages({
      "string.empty": "La catégorie de la dépense ne peut pas être vide",
      "any.required": "La catégorie de la dépense est requis"
    })
});

module.exports = addExpenseSchema;