const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../error/InvariantError');
const NotFoundError = require('../../error/NotFoundError');

class NotesService {
    constructor() {
        this._pool = new Pool();
    }

    async addNote(ownerId, title, content) {
        const noteId = `note-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [noteId, ownerId, title, content, createdAt, createdAt],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getNoteById(id) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }

        return result.rows[0];
    }

    async getNotesByOwnerId(ownerId) {
        const query = {
            text: 'SELECT * FROM notes WHERE owner_id = $1',
            values: [ownerId],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }

        return result.rows;
    }

    async updateNoteById(id, { title, content }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE notes SET title = $1, content = $2, updated_at = $3 WHERE id = $4 RETURNING id',
            values: [title, content, updatedAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        return result.rows[0].id;
    }

    async deleteNoteById(id) {
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = NotesService;
