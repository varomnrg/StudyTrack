const routes = (handler, validator) => [
    {
        method: 'POST',
        path: '/task',
        handler: (request, h) => handler.postTaskHandler(request, h),
        options: {
            auth: 'studytrack_jwt',
            description: 'Menambahkan task baru',
            notes: 'Menerima request body berupa title (opsional), description, dueDate (optional), dan status',
            tags: ['api'],
            validate: {
                payload: validator.TaskPayloadSchema,
            },
        },
    },
    {
        method: 'GET',
        path: '/task/{id}',
        handler: (request) => handler.getTaskByIdHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'Menampilkan detail task berdasarkan id',
            notes: 'Menerima request parameter berupa id dan mengembalikan response berupa detail task',
            tags: ['api'],
            validate: {
                params: validator.TaskParamSchema,
            },
        },
    },
    {
        method: 'GET',
        path: '/tasks/{ownerId}',
        handler: (request) => handler.getTasksByOwnerIdHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'Menampilkan daftar task berdasarkan ownerId',
            notes: 'Menerima request parameter berupa ownerId dan mengembalikan response berupa daftar task yang dimiliki oleh ownerId tersebut',
            tags: ['api'],
            validate: {
                params: validator.TaskOwnerParamSchema,
            },
        },
    },
    {
        method: 'PUT',
        path: '/task/{id}',
        handler: (request) => handler.putTaskByIdHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'Memperbarui task berdasarkan id',
            notes: 'Menerima request parameter berupa id dan request body berupa title (opsional), description, dueDate (optional), dan status',
            tags: ['api'],
            validate: {
                payload: validator.TaskPayloadSchema,
                params: validator.TaskParamSchema,
            },
        },
    },
    {
        method: 'DELETE',
        path: '/task/{id}',
        handler: (request) => handler.deleteTaskByIdHandler(request),
        options: {
            auth: 'studytrack_jwt',
            description: 'Menghapus task berdasarkan id',
            notes: 'Menerima request parameter berupa id dan menghapus task yang sesuai dengan id tersebut',
            tags: ['api'],
            validate: {
                params: validator.TaskParamSchema,
            },
        },
    },
];

module.exports = routes;
