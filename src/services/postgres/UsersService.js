const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../error/InvariantError');
const NotFoundError = require('../../error/NotFoundError');

class UsersService {
    constructor() {
        this._pool = new Pool();
        this._saltRounds = 10;
    }

    async addUser(username, email, password) {
        await this.verifyNewUsername(username);
        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, this._saltRounds);
        const createdAt = new Date().toISOString();
        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, username, email, hashedPassword, createdAt],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('User gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getUserById(id) {
        const query = {
            text: 'SELECT id,username,email FROM users WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            console.log('NotFoundError');
            throw new NotFoundError('User tidak ditemukan');
        }

        return result.rows[0];
    }

    async updateUserById(id, { username, email }) {
        const query = {
            text: 'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id',
            values: [username, email, id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Gagal memperbarui user. Id tidak ditemukan');
        }
    }

    async deleteUserById(id) {
        const query = {
            text: 'DELETE FROM users WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('User gagal dihapus. Id tidak ditemukan');
        }
    }

    async verifyNewUsername(username) {
        const query = {
            text: 'SELECT username FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (result.rowCount) {
            throw new InvariantError('Gagal menambahkan user, username sudah digunakan');
        }
    }

    async verifyUserCredential(username, password) {
        const query = {
            text: 'SELECT id, password FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('Kredensial yang Anda berikan salah');
        }

        const { id, password: hashedPassword } = result.rows[0];
        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new InvariantError('Kredensial yang Anda berikan salah');
        }

        return id;
    }
}

module.exports = UsersService;
