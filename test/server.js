const fastify = require('fastify');
const autoLoad = require('@fastify/autoload');
const path = require('path');

require('dotenv').config();

const buildServer = async () => {
    let Fastify;
    try {
        Fastify = fastify();

        Fastify
            .register(autoLoad, {
                dir: path.join(__dirname, '../plugins/general'),
            })
            .register(autoLoad, {
                dir: path.join(__dirname, '../plugins/kafka'),
                ignorePattern: 'consumer.plugin.js'
            });

        return Fastify;
    } catch (error) {
        Fastify.log.error('error in fastify server %O', error);
    }
}

module.exports = buildServer;
