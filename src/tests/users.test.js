const request = require('supertest');
const createServer = require('../server');
const { nanoid } = require('nanoid');
const server = createServer();
console.log(`user${nanoid(5)}`);
// Mock console.log
//console.log = jest.fn();
// POST /task

describe('POST /user', () => {
    describe('when request is valid', () => {
        it('should return 201', async () => {
            const user = `user-${nanoid(5)}`;
            const res = await request((await server).listener)
                .post('/user')
                .send({
                    username: `${user}`,
                    email: `${user}@gmail.com`,
                    password: 'password1',
                });
            expect(res.statusCode).toEqual(201);
        });

        it('should return the correct response body', async () => {
            const user = `user-${nanoid(5)}`;
            const res = await request((await server).listener)
                .post('/user')
                .send({
                    username: `${user}`,
                    email: `${user}@gmail.com`,
                    password: 'password1',
                });
            expect(res.body).toEqual({
                status: 'success',
                message: 'User berhasil ditambahkan',
                data: {
                    user_id: expect.any(String),
                },
            });
        });
    });

    describe('when request is invalid', () => {
        it('should return 400 when username is not provided', async () => {
            const res = await request((await server).listener)
                .post('/user')
                .send({
                    email: 'user1@gmail.com',
                    password: 'password1',
                });
            expect(res.statusCode).toEqual(400);
        });

        it('should return 400 when email is not provided', async () => {
            const user = `user-${nanoid(5)}`;
            const res = await request((await server).listener)
                .post('/user')
                .send({
                    username: `${user}`,
                    password: 'password1',
                });
            expect(res.statusCode).toEqual(400);
        });

        it('should return 400 when password is not provided', async () => {
            const user = `user-${nanoid(5)}`;
            const res = await request((await server).listener)
                .post('/user')
                .send({
                    username: `${user}`,
                    email: `${user}@gmail.com`,
                });
            expect(res.statusCode).toEqual(400);
        });

        it('should return 400 when username is already taken', async () => {
            const user = `user-${nanoid(5)}`;
            await request((await server).listener)
                .post('/user')
                .send({
                    username: `${user}`,
                    email: `${user}@gmail.com`,
                    password: 'password1',
                });
            const res = await request((await server).listener)
                .post('/user')
                .send({
                    username: `${user}`,
                    email: `${user}@gmail.com`,
                    password: 'password1',
                });
            expect(res.statusCode).toEqual(400);
        });
    });
});

describe('GET /user/{id}', () => {
    describe('when request is valid', () => {
        it('should return 200', async () => {
            const user = `user-${nanoid(5)}`;
            const res = await request((await server).listener)
                .post('/user')
                .send({
                    username: `${user}`,
                    email: `${user}@gmail.com`,
                    password: 'password1',
                });
            const { user_id } = res.body.data;
            const res2 = await request((await server).listener).get(`/user/${user_id}`);
            expect(res2.statusCode).toEqual(200);
        });

        it('should return the correct response body', async () => {
            const user = `user-${nanoid(5)}`;
            const res = await request((await server).listener)
                .post('/user')
                .send({
                    username: `${user}`,
                    email: `${user}@gmail.com`,
                    password: 'password1',
                });
            const { user_id } = res.body.data;
            const res2 = await request((await server).listener).get(`/user/${user_id}`);
            expect(res2.body).toEqual({
                status: 'success',
                data: {
                    id: expect.any(String),
                    username: expect.any(String),
                    email: expect.any(String),
                },
            });
        });
    });

    describe('when request is invalid', () => {
        it('should return 404 when user is not found', async () => {
            const res = await request((await server).listener).get(`/user/123`);
            expect(res.statusCode).toEqual(404);
        });
    });
});
