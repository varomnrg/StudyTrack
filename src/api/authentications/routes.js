const routes = (handler, validator) => [
    {
        method: 'POST',
        path: '/authentications',
        handler: (request, h) => handler.postAuthenticationHandler(request, h),
        options: {
            description: 'menambahkan refresh token',
            notes: 'membuat access token dan refresh token',
            tags: ['api'],
            validate: {
                payload: validator.PostAuthenticationPayloadSchema,
            },
        },
    },
    {
        method: 'PUT',
        path: '/authentications',
        handler: (request) => handler.putAuthenticationHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'memperbarui access token dengan refresh token',
            notes: 'mengembalikan access token baru',
            tags: ['api'],
            validate: {
                payload: validator.PutAuthenticationPayloadSchema,
            },
        },
    },
    {
        method: 'DELETE',
        path: '/authentications',
        handler: (request) => handler.deleteAuthenticationHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'menghapus refresh token',
            notes: 'refresh token yang digunakan akan dihapus',
            tags: ['api'],
            validate: {
                payload: validator.DeleteAuthenticationPayloadSchema,
            },
        },
    },
];

module.exports = routes;
