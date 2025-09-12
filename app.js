const fastify = require('fastify');
const autoLoad = require('@fastify/autoload');
const path = require('path');

require('dotenv').config();

const buildServer = async () => {
    let Fastify;
    try {
        Fastify = fastify({
            logger: {
                level: 'trace'
            },
        });

        Fastify
            .register(autoLoad, {
                dir: path.join(__dirname, 'routes'),
            })
            .register(autoLoad, {
                dir: path.join(__dirname, 'plugins'),
            });

        const serverOptions = {
            port: process.env.APP_PORT,
            path: process.env.APP_HOST_IP,
        }

        Fastify.printRoutes();
        await Fastify.listen(serverOptions);
        Fastify.log.trace(`server listening on http://${process.env.APP_HOST_IP}:${process.env.APP_PORT}`)
    } catch (error) {
        Fastify.log.error('erron starting the server %O', error);
    }
}

buildServer();