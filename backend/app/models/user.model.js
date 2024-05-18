const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const UserConfig = require('./user-config.model.js')

module.exports = new BaseModel('User', {
    id: Joi.number().required(),
    name: Joi.string().required(),
    firstname: Joi.string().required(),
    birthdate: Joi.string().required(),
    hobbies: Joi.string().required(),
    config: UserConfig.schema,
    charts: Joi.array().items(Joi.string()).required(),
    statsId: Joi.array().items(Joi.number()).required(),
    avatar: Joi.string().allow('').required(),
    colorBlind: Joi.string().required()
})