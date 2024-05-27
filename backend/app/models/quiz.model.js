const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizConfig', {
  title: Joi.string().required(),
  imageUrl: Joi.string(),
  questions: Joi.array().items(Joi.number().required()).required(),
  quizDescription: Joi.string().required(),
  id: Joi.number().required(),
  picsMemory: Joi.array().items(Joi.string()),
  specials: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    rulesForSimon: Joi.array().items(Joi.object({
      numberOfRound: Joi.number().required(),
      numberOfBoxes: Joi.number().required(),
      numberOfRetriesAllowed: Joi.number().required(),
    })),
  })).required(),
})
