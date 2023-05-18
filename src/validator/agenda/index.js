const { AgendaPayloadSchema, AgendaParamsSchema } = require('./schema');
const InvariantError = require('../../error/InvariantError');

const AgendaValidator = {
    validateAgendaPayload: (payload) => {
        const validationResult = AgendaPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    AgendaPayloadSchema,
    AgendaParamsSchema,
};

module.exports = AgendaValidator;
