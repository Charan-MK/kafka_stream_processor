const fp = require('fastify-plugin');

async function kafkaProducerPlugin(fastify) {
    async function kafkaProducer(messages, topic) {
        fastify.log.trace('kafkaProducerPlugin plugin starts');

        try {
            const kafka = await fastify.kafka_instance();
            const producer = await kafka.producer();

            await producer.connect();
            fastify.log.trace('kafkaProducerPlugin: producer connected successfully');
            await producer.send({
                topic: topic,
                messages: [
                    { value: JSON.stringify(messages) },
                ]
            })
            fastify.log.trace('kafkaProducerPlugin: message published successfully to topic %s', topic)
        } catch (error) {
            fastify.log.error('kafkaProducerPlugin: error while publishing message to kafka topic %O', error);
        }
        fastify.log.trace('kafkaProducerPlugin ends')
    }
    fastify.decorate('kafka_producer', kafkaProducer);
}

module.exports = fp(kafkaProducerPlugin);