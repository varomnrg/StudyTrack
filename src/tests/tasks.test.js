const request = require('supertest');
const createServer = require('../server');

const server = createServer();
// Mock console.log
//console.log = jest.fn();
// POST /task
describe('POST /task', () => {
    describe('when request is valid', () => {
        it('should return 201', async () => {
            const res = await request((await server).listener)
                .post('/task')
                .send({
                    title: 'Task 1',
                    description: 'Description 1',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            expect(res.statusCode).toEqual(201);
        });

        it('should return the correct response body', async () => {
            const res = await request((await server).listener)
                .post('/task')
                .send({
                    title: 'Task 1',
                    description: 'Description 1',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            expect(res.body).toEqual({
                status: 'success',
                message: 'Task berhasil ditambahkan',
                data: {
                    task_id: expect.any(String),
                },
            });
        });

        it('should return 200 when title is not provided', async () => {
            const res = await request((await server).listener)
                .post('/task')
                .send({
                    description: 'Description 1',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            expect(res.statusCode).toEqual(201);
        });
    });

    describe('when request is invalid', () => {
        it('should return 400 when description is not provided', async () => {
            const res = await request((await server).listener)
                .post('/task')
                .send({
                    title: 'Title 1',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            expect(res.statusCode).toEqual(400);
        });
    });
});

describe('GET /task/{id}', () => {
    describe('when request is valid', () => {
        let task_id;
        it('should return 200', async () => {
            const tester = await request((await server).listener)
                .post('/task')
                .send({
                    title: 'Task 1',
                    description: 'Description 1',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            task_id = tester.body.data.task_id;
            const res = await request((await server).listener).get('/task/' + task_id);
            expect(res.statusCode).toEqual(200);
        });

        it('should return the correct response body', async () => {
            const res = await request((await server).listener).get('/task/' + task_id);
            const isoRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}/;
            expect(res.body).toEqual({
                status: 'success',
                data: {
                    id: expect.any(String),
                    owner_id: expect.any(String),
                    title: expect.any(String),
                    description: expect.any(String),
                    due_date: expect.stringMatching(isoRegex),
                    status: expect.any(Number),
                    created_at: expect.stringMatching(isoRegex),
                    updated_at: expect.stringMatching(isoRegex),
                },
            });
        });
    });

    describe('when request is invalid', () => {
        it('should return 404 when task is not found', async () => {
            const res = await request((await server).listener).get('/task/999');
            expect(res.statusCode).toEqual(404);
        });

        it('should return the correct response body', async () => {
            const res = await request((await server).listener).get('/task/999');
            expect(res.body).toEqual({
                status: 'fail',
                message: 'Task tidak ditemukan',
            });
        });
    });
});

describe('PUT /task/{id}', () => {
    describe('when request is valid', () => {
        let task_id;
        it('should return 200', async () => {
            const tester = await request((await server).listener)
                .post('/task')
                .send({
                    title: 'Task 1',
                    description: 'Description 1',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            task_id = tester.body.data.task_id;
            const res = await request((await server).listener)
                .put('/task/' + task_id)
                .send({
                    title: 'Task 1',
                    description: 'Description 2',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            expect(res.statusCode).toEqual(200);
        });

        it('should return the correct response body', async () => {
            const res = await request((await server).listener)
                .put('/task/' + task_id)
                .send({
                    title: 'Task 1',
                    description: 'Description 2',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            expect(res.body).toEqual({
                status: 'success',
                message: 'Task berhasil diperbaharui',
            });
        });
    });

    describe('when request is invalid', () => {
        it('should return 404 when task is not found', async () => {
            const res = await request((await server).listener)
                .put('/task/999')
                .send({
                    title: 'Task 1',
                    description: 'Description 2',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            expect(res.statusCode).toEqual(404);
        });

        it('should return the correct response body', async () => {
            const res = await request((await server).listener)
                .put('/task/999')
                .send({
                    title: 'Task 1',
                    description: 'Description 2',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            expect(res.body).toEqual({
                status: 'fail',
                message: 'Gagal memperbarui task, Id tidak ditemukan',
            });
        });
    });
});

describe('DELETE /task/{id}', () => {
    describe('when request is valid', () => {
        it('should return 200', async () => {
            const tester = await request((await server).listener)
                .post('/task')
                .send({
                    title: 'Task 1',
                    description: 'Description 1',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            const res = await request((await server).listener).delete('/task/' + tester.body.data.task_id);
            console.log(res);
            expect(res.statusCode).toEqual(200);
        });

        it('should return the correct response body', async () => {
            const tester = await request((await server).listener)
                .post('/task')
                .send({
                    title: 'Task 1',
                    description: 'Description 1',
                    dueDate: '2023-05-15',
                    status: 2,
                });
            const res = await request((await server).listener).delete('/task/' + tester.body.data.task_id);
            expect(res.body).toEqual({
                status: 'success',
                message: 'Task berhasil dihapus',
            });
        });
    });

    describe('when request is invalid', () => {
        it('should return 404 when task is not found', async () => {
            const res = await request((await server).listener).delete('/task/999');
            expect(res.statusCode).toEqual(404);
        });

        it('should return the correct response body', async () => {
            const res = await request((await server).listener).delete('/task/999');
            expect(res.body).toEqual({
                status: 'fail',
                message: 'Gagal menghapus task, Id tidak ditemukan',
            });
        });
    });
});
