const createServer = require("./server");

const startServer = async () => {
    try {
        const server = await createServer();
        await server.start();
        console.log(`Server berjalan pada ${server.info.uri}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

startServer();
