class NotesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postNoteHandler(request, h) {
        this._validator.validateNotePayload(request.payload);
        const { title = 'untitled', content } = request.payload;
        const { id: ownerId } = request.auth.credentials;
        const noteId = await this._service.addNote(ownerId, title, content);

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                note_id: noteId,
            },
        });

        response.code(201);

        return response;
    }

    async getNoteByIdHandler(request) {
        const { id } = request.params;
        const note = await this._service.getNoteById(id);
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    async getNotesByOwnerIdHandler(request) {
        const { id: ownerId } = request.auth.credentials;
        const notes = await this._service.getNotesByOwnerId(ownerId);
        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }

    async putNoteByIdHandler(request) {
        this._validator.validateNotePayload(request.payload);
        const { id } = request.params;
        const { title, content } = request.payload;
        await this._service.updateNoteById(id, { title, content });
        return {
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        };
    }

    async deleteNoteByIdHandler(request) {
        const { id } = request.params;
        await this._service.deleteNoteById(id);
        return {
            status: 'success',
            message: 'Catatan berhasil dihapus',
        };
    }
}

module.exports = NotesHandler;
