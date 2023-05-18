require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');

//error
const ClientError = require('./error/ClientError');

//tasks
const tasks = require('./api/tasks');
const TasksService = require('./services/postgres/TasksService');
const TasksValidator = require('./validator/tasks');

//users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

//notes
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');

//Create Server
const createServer = async () => {
    //Init Plugin
    const tasksService = new TasksService();
    const usersService = new UsersService();
    const notesService = new NotesService();

    //Server Config
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
        debug: {
            request: ['error'],
        },
    });

    //Logging incoming request
    server.ext('onPostResponse', (request, h) => {
        console.log(
            new Date().toISOString() +
                ': ' +
                request.method.toUpperCase() +
                ' ' +
                request.path +
                ' --> ' +
                request.response.statusCode
        );
        return h.continue;
    });

    //Error response
    server.ext('onPreResponse', (request, h) => {
        const { response } = request;
        if (response instanceof Error) {
            if (response instanceof ClientError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: response.message,
                });
                newResponse.code(response.statusCode);
                return newResponse;
            }
            if (!response.isServer) {
                return h.continue;
            }
            const newResponse = h.response({
                status: 'error',
                message: 'terjadi kegagalan pada server kami',
            });
            newResponse.code(500);
            return newResponse;
        }
        return h.continue;
    });

    const swaggerOptions = {
        info: {
            title: 'StudyTrack App Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    await server.register([
        {
            plugin: tasks,
            options: {
                service: tasksService,
                validator: TasksValidator,
            },
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
        {
            plugin: notes,
            options: {
                service: notesService,
                validator: NotesValidator,
            },
        },
    ]);

    return server;
};

module.exports = createServer;
