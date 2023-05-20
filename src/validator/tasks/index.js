const { TaskPayloadSchema, TaskParamSchema } = require('./schema');
const InvariantError = require('../../error/InvariantError');

const TaskValidator = {
    validateTaskPayload: (payload) => {
        const validationResult = TaskPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    TaskPayloadSchema,
    TaskParamSchema,
};

module.exports = TaskValidator;
