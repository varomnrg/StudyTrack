const routes = (handler, validator) => [
    {
        method: 'POST',
        path: '/note',
        handler: (request, h) => handler.postNoteHandler(request, h),
        options: {
            description: 'Menambahkan catatan',
            notes: 'Menambahkan catatan baru dengan title dan content',
            tags: ['api'],
            validate: {
                payload: validator.NotePayloadSchema,
            },
        },
    },
    {
        method: 'GET',
        path: '/note/{id}',
        handler: (request) => handler.getNoteByIdHandler(request),
        options: {
            description: 'Menampilkan catatan berdasarkan id',
            notes: 'Menampilkan catatan berdasarkan id',
            tags: ['api'],
            validate: {
                params: validator.NoteParamsSchema,
            },
        },
    },
    {
        method: 'PUT',
        path: '/note/{id}',
        handler: (request) => handler.putNoteByIdHandler(request),
        options: {
            description: 'Mengubah catatan berdasarkan id',
            notes: 'Mengubah catatan berdasarkan id',
            tags: ['api'],
            validate: {
                params: validator.NoteParamsSchema,
                payload: validator.NotePayloadSchema,
            },
        },
    },
    {
        method: 'DELETE',
        path: '/note/{id}',
        handler: (request) => handler.deleteNoteByIdHandler(request),
        options: {
            description: 'Menghapus catatan berdasarkan id',
            notes: 'Menghapus catatan berdasarkan id',
            tags: ['api'],
            validate: {
                params: validator.NoteParamsSchema,
            },
        },
    },
];

module.exports = routes;
