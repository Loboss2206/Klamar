const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const StatSimon = require('./stat-simon.model.js')
const StatMemory = require('./stat-memory.model.js')
const StatQuestion = require('./stat-question.model.js')

module.exports = new BaseModel('Stat', {
  id: Joi.number().required(),

  simonStats: StatSimon.schema,
  memoryStats: StatMemory.schema,
  questions: Joi.array().items(StatQuestion.schema),

  sucessSimon: Joi.number().required(),
  sucessMemory: Joi.number().required(),
  sucessQuiz: Joi.number().required(),
  date: Joi.string().required(),
})
