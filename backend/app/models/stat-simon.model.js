const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('StatSimon', {
  erreurSimon: Joi.number().required(),
  indicesSimon: Joi.number().required(),
  tempsSimon: Joi.number().required(),
  tailleFinalSimon: Joi.number().required(),
  nombreDeCouleurs: Joi.number().required(),
  wasPassed: Joi.boolean().required(),
})
