const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('StatMemory', {
  erreurMemory: Joi.number().required(),
  indicesMemory: Joi.number().required(),
  tempsMemory: Joi.number().required(),
  pictures: Joi.array().items(Joi.string()).required(),
})
