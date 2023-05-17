const Joi = require('joi');

const TaskPayloadSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().required(),
    dueDate: Joi.date(),
    status: Joi.number().integer().min(0).max(2).default(0),
});

const TaskParamSchema = Joi.object({
    id: Joi.string().required(),
});

module.exports = { TaskPayloadSchema, TaskParamSchema };
