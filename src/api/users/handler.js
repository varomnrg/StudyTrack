class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postUserHandler(request, h) {
        this._validator.validateUserPayload(request.payload);
        const { username, email, password } = request.payload;
        const userId = await this._service.addUser(username, email, password);

        const response = h.response({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: {
                user_id: userId,
            },
        });

        response.code(201);

        return response;
    }

    async getUserByIdHandler(request) {
        const { id } = request.params;
        const user = await this._service.getUserById(id);
        return {
            status: 'success',
            data: {
                ...user,
            },
        };
    }

    async putUserByIdHandler(request) {
        this._validator.validatePutUserPayload(request.payload);
        const { id } = request.params;
        const { username, email } = request.payload;
        await this._service.updateUserById(id, { username, email });
        return {
            status: 'success',
            message: `User dengan id ${id} telah diperbaharui`,
        };
    }

    async deleteUserByIdHandler(request) {
        const { id } = request.params;
        await this._service.deleteUserById(id);
        return {
            status: 'success',
            message: 'User berhasil dihapus',
        };
    }
}

module.exports = UsersHandler;
