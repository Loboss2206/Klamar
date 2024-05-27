const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('UserConfig', {
  simon: Joi.object({
    isColorful: Joi.boolean().required(),
  }).required(),
  memory: Joi.object({
    timeBeforeSwitching: Joi.number().required(),
  }).required(),
  simonHints: Joi.object({
    displayTheFullSequenceAfter: Joi.number().required(),
  }).required(),
  memoryHints: Joi.object({
    timeBeforeHints: Joi.number().required(),
  }).required(),
  quiz: Joi.object({
    showHintAfterError: Joi.boolean().required(),
    showHintAfterStart: Joi.boolean().required(),
    showHintAfterClick: Joi.boolean().required(),
    showHintOneByOne: Joi.boolean().required(),
  }).required(),
  zoomLevel: Joi.number().required(),
})
