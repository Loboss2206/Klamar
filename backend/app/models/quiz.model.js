const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizConfig', {
  title: Joi.string().required(),
  imageUrl: Joi.string().allow('').optional(),
  questions: Joi.array().items(Joi.number()).required(),
  quizDescription: Joi.string().allow('').optional(),
  id: Joi.number().required(),
  picsMemory: Joi.array().items(Joi.string()),
  specials: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    rulesForSimon: Joi.object({
      numberOfRound: Joi.number().required(),
      numberOfBoxes: Joi.number().required(),
      numberOfRetriesAllowed: Joi.number().required(),
    }),
  })).required(),
})
