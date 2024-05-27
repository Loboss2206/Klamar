const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
    question: Joi.string().required(),
    questionImage: Joi.string().allow(""),
    tips: Joi.array().items(Joi.string()).required(),
    AreResponsesImages: Joi.boolean().required(),
    AreTipsImages: Joi.boolean(),
    AreTipsAvailable: Joi.boolean(),
    responses: Joi.array().items(Joi.string()).required(),
    answer: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    id: Joi.number().required(),
})