const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../error/InvariantError');

class TasksService {
    constructor() {
        this._pool = new Pool();
    }

    async addTask({ ownerId, title, description, dueDate, status }) {
        const id = await `task-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        let duedate = dueDate.toISOString();
        const query = {
            text: 'INSERT INTO tasks VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [id, ownerId, title, description, duedate, status, createdAt, createdAt],
        };
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('Task gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async getTaskById(ownerId) {
        const query = {
            text: 'SELECT * FROM tasks WHERE id = $1',
            values: [ownerId],
        };
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('Task tidak ditemukan');
        }
        return result.rows;
    }

    async updateTaskById({ id, title, description, dueDate, status }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4, updated_at = $5 WHERE id = $6 RETURNING id',
            values: [title, description, dueDate, status, updatedAt, id],
        };
        const result = await this._pool.query(query);
        console.log(result);
        if (!result.rowCount) {
            throw new InvariantError('Gagal memperbarui task');
        }
    }

    async deleteTaskById(id) {
        const query = {
            text: 'DELETE FROM tasks WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('Gagal menghapus task');
        }
    }
}

module.exports = TasksService;
