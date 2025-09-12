const fp = require('fastify-plugin');
const { Kafka } = require('kafkajs');

async function kafkaInstance(fastify) {
    let kafka;
    async function insatnce() {
        fastify.log.trace('Kafka instance plugin starts');

        try {
            kafka = new Kafka({
                clientId: 'kafka streamer',
                brokers: [process.env.KAFKA_BROKER],
            })

        } catch (error) {
            fastify.log.error('error while creating kafka instance %O', error);
            throw new Error('Kafka Instance error', error);
        }
        fastify.log.trace('Kafka instance plugin ends');

        return kafka;
    }
    fastify.decorate('kafka_instance', insatnce);
}

module.exports = fp(kafkaInstance);