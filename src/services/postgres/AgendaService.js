const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../error/InvariantError');
const NotFoundError = require('../../error/NotFoundError');

class AgendaService {
    constructor() {
        this._pool = new Pool();
    }

    async addAgenda(ownerId, title, description, startDate, endDate) {
        const agendaId = `agenda-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const query = {
            text: 'INSERT INTO agenda VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [agendaId, ownerId, title, description, startDate, endDate, createdAt, createdAt],
        };
        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Agenda gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getAgendaById(agendaId) {
        const query = {
            text: 'SELECT id, owner_id, title, description, start_date, end_date, updated_at FROM agenda WHERE id = $1',
            values: [agendaId],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Agenda tidak ditemukan');
        }

        return result.rows[0];
    }

    async getAgendasByOwnerId(ownerId) {
        const query = {
            text: 'SELECT * FROM agenda WHERE owner_id = $1',
            values: [ownerId],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Agenda tidak ditemukan');
        }

        return result.rows;
    }

    async updateAgendaById(agendaId, { title, description, startDate, endDate }) {
        const updatedAt = new Date().toISOString();
        console.log(agendaId, title, description, startDate, endDate, updatedAt);
        const query = {
            text: 'UPDATE agenda SET title = $1, description = $2, start_date = $3, end_date = $4, updated_at = $5 WHERE id = $6 RETURNING id',
            values: [title, description, startDate, endDate, updatedAt, agendaId],
        };
        console.log(query);
        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Gagal memperbarui agenda. Id tidak ditemukan');
        }
    }

    async deleteAgendaById(agendaId) {
        const query = {
            text: 'DELETE FROM agenda WHERE id = $1 RETURNING id',
            values: [agendaId],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Agenda gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = AgendaService;
