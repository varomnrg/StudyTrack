const Joi = require('joi');

const AgendaPayloadSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    start_date: Joi.date().iso(),
    end_date: Joi.date().iso(),
});

const AgendaParamsSchema = Joi.object({
    id: Joi.string().required(),
});

module.exports = { AgendaPayloadSchema, AgendaParamsSchema };
