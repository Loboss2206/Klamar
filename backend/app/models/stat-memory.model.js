const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('StatMemory', {
  erreurMemory: Joi.number().required(),
  indicesMemory: Joi.number().required(),
  tempsMemory: Joi.number().required(),
  largeurMemory: Joi.number().required(),
  hauteurMemory: Joi.number().required(),
})
