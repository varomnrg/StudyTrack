const AgendaHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'agenda',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const agendaHandler = new AgendaHandler(service, validator);
        server.route(routes(agendaHandler, validator));
    },
};
