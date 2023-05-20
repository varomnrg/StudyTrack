require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Jwt = require('@hapi/jwt');
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

//agenda
const agenda = require('./api/agenda');
const AgendaService = require('./services/postgres/AgendaService');
const AgendaValidator = require('./validator/agenda');

//authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

//Create Server
const createServer = async () => {
    //Init Plugin
    const tasksService = new TasksService();
    const usersService = new UsersService();
    const notesService = new NotesService();
    const agendaService = new AgendaService();
    const authenticationsService = new AuthenticationsService();

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
        securityDefinitions: {
            bearerAuth: {
                scheme: 'bearer',
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
        security: [{ bearerAuth: [] }],
    };

    await server.register([
        Inert,
        Vision,
        Jwt,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    //JWT Auth Strategy
    server.auth.strategy('studytrack_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });

    // server.realm.modifiers.route.prefix = '/api';
    await server.register([
        {
            plugin: authentications,
            options: {
                authenticationsService,
                usersService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
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
        {
            plugin: agenda,
            options: {
                service: agendaService,
                validator: AgendaValidator,
            },
        },
    ]);

    return server;
};

module.exports = createServer;
