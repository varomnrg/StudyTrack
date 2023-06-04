const routes = (handler, validator) => [
    {
        method: 'POST',
        path: '/user',
        handler: (request, h) => handler.postUserHandler(request, h),
        options: {
            description: 'Menambahkan user',
            notes: 'Membuat user baru jika email dan username belum terdaftar',
            tags: ['api'],
            validate: {
                payload: validator.UserPayloadSchema,
            },
        },
    },
    {
        method: 'GET',
        path: '/user/{id}',
        handler: (request) => handler.getUserByIdHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'Mendapatkan user berdasarkan id',
            notes: 'Mendapatkan user berdasarkan id',
            tags: ['api'],
            validate: {
                params: validator.UserParamSchema,
            },
        },
    },
    {
        method: 'PUT',
        path: '/user/{id}',
        handler: (request) => handler.putUserByIdHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'Memperbaharui user berdasarkan id',
            notes: 'Memperbaharui user berdasarkan id',
            tags: ['api'],
            validate: {
                params: validator.UserParamSchema,
                payload: validator.PutUserPayloadSchema,
            },
        },
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        handler: (request) => handler.deleteUserByIdHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'Menghapus user berdasarkan id',
            notes: 'Menghapus user berdasarkan id',
            tags: ['api'],
            validate: {
                params: validator.UserParamSchema,
            },
        },
    },
];

module.exports = routes;
