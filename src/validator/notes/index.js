const { NotePayloadSchema, NoteParamsSchema } = require('./schema');
const InvariantError = require('../../error/InvariantError');

const NotesValidator = {
    validateNotePayload: (payload) => {
        const validationResult = NotePayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    NoteParamsSchema,
    NotePayloadSchema,
};

module.exports = NotesValidator;
