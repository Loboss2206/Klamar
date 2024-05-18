const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('StatQuestion', {
  idQuestion: Joi.number().required(),
  pointQuestion: Joi.number().required(),
  maxPointQuestion: Joi.number().required(),
  erreurQuiz: Joi.number().required(),
  indicesQuiz: Joi.number().required(),
  tempsQuiz: Joi.number().required(),
  reponseId: Joi.array().items(Joi.number()).required(),
})
