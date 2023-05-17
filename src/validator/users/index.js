const { UserPayloadSchema, PutUserPayloadSchema, UserParamSchema } = require('./schema');
const InvariantError = require('../../error/InvariantError');

const UserValidator = {
    validateUserPayload: (payload) => {
        const validationResult = UserPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validatePutUserPayload: (payload) => {
        const validationResult = PutUserPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    UserPayloadSchema,
    UserParamSchema,
    PutUserPayloadSchema,
};

module.exports = UserValidator;
