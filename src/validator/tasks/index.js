const { TaskPayloadSchema, TaskParamSchema, TaskOwnerParamSchema } = require('./schema');
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
    TaskOwnerParamSchema,
};

module.exports = TaskValidator;
