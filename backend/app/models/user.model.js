const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const UserConfig = require('./user-config.model.js')

module.exports = new BaseModel('User', {
    id: Joi.number().required(),
    name: Joi.string().required(),
    firstname: Joi.string().required(),
    birthdate: Joi.string().allow('').optional(),
    hobbies: Joi.string().allow('').optional(),
    config: UserConfig.schema,
    charts: Joi.array().items(Joi.string()).required(),
    avatar: Joi.string().required(),
    colorBlind: Joi.string().required(),
})
