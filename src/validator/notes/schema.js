const Joi = require('joi');

const NotePayloadSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});

const NoteParamsSchema = Joi.object({
    id: Joi.string().required(),
});

module.exports = { NotePayloadSchema, NoteParamsSchema };
