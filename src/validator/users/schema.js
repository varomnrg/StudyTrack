const Joi = require('joi');

const UserPayloadSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email({ tlds: true }).required(),
    password: Joi.string().required(),
});

const PutUserPayloadSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email({ tlds: true }).required(),
});

const UserParamSchema = Joi.object({
    id: Joi.string().required(),
});

module.exports = { UserPayloadSchema, PutUserPayloadSchema, UserParamSchema };
