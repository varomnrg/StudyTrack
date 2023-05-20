const Joi = require('joi');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/authentications',
        handler: (request, h) => handler.postAuthenticationHandler(request, h),
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                }),
            },
        },
    },
    {
        method: 'PUT',
        path: '/authentications',
        handler: (request) => handler.putAuthenticationHandler(request),
        options: {
            tags: ['api'],
        },
    },
    {
        method: 'DELETE',
        path: '/authentications',
        handler: (request) => handler.deleteAuthenticationHandler(request),
        options: {
            tags: ['api'],
        },
    },
];

module.exports = routes;
