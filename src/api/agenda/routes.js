const routes = (handler, validator) => [
    {
        method: 'POST',
        path: '/agenda',
        handler: (request, h) => handler.postAgendaHandler(request, h),
        options: {
            auth: 'studytrack_jwt',
            description: 'Menambahkan agenda',
            notes: 'Menambahkan agenda baru dengan title dan description',
            tags: ['api'],
            validate: {
                payload: validator.AgendaPayloadSchema,
            },
        },
    },
    {
        method: 'GET',
        path: '/agenda/{id}',
        handler: (request) => handler.getAgendaByIdHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'Menampilkan agenda berdasarkan id',
            notes: 'Menampilkan agenda berdasarkan id',
            tags: ['api'],
            validate: {
                params: validator.AgendaParamsSchema,
            },
        },
    },
    {
        method: 'PUT',
        path: '/agenda/{id}',
        handler: (request) => handler.putAgendaByIdHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'Mengubah agenda berdasarkan id',
            notes: 'Mengubah agenda berdasarkan id',
            tags: ['api'],
            validate: {
                params: validator.AgendaParamsSchema,
                payload: validator.AgendaPayloadSchema,
            },
        },
    },
    {
        method: 'DELETE',
        path: '/agenda/{id}',
        handler: (request) => handler.deleteAgendaByIdHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'Menghapus agenda berdasarkan id',
            notes: 'Menghapus agenda berdasarkan id',
            tags: ['api'],
            validate: {
                params: validator.AgendaParamsSchema,
            },
        },
    },
];

module.exports = routes;
