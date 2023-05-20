class AgendaHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postAgendaHandler(request, h) {
        await this._validator.validateAgendaPayload(request.payload);
        const { title, description, start_date, end_date } = request.payload;
        const { id: ownerId } = request.auth.credentials;
        const id = await this._service.addAgenda(ownerId, title, description, start_date, end_date);
        const response = h.response({
            status: 'success',
            message: 'Agenda berhasil ditambahkan',
            data: {
                agenda_id: id,
            },
        });

        response.code(201);
        return response;
    }

    async getAgendaByIdHandler(request) {
        const { id } = request.params;
        const agenda = await this._service.getAgendaById(id);
        return {
            status: 'success',
            data: {
                agenda,
            },
        };
    }

    async getAgendasByOwnerIdHandler(request) {
        const { id: ownerId } = request.auth.credentials;
        const agendas = await this._service.getAgendasByOwnerId(ownerId);
        return {
            status: 'success',
            data: agendas,
        };
    }

    async putAgendaByIdHandler(request) {
        await this._validator.validateAgendaPayload(request.payload);
        const { id } = request.params;
        const { title, description, start_date: startDate, end_date: endDate } = request.payload;
        await this._service.updateAgendaById(id, { title, description, startDate, endDate });
        return {
            status: 'success',
            message: `Agenda dengan id ${id} berhasil diperbarui`,
        };
    }

    async deleteAgendaByIdHandler(request) {
        const { id } = request.params;
        await this._service.deleteAgendaById(id);
        return {
            status: 'success',
            message: `Agenda dengan id ${id} berhasil dihapus`,
        };
    }
}

module.exports = AgendaHandler;
