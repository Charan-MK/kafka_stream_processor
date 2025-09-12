const fp = require('fastify-plugin');

async function consumerPlugin(fastify) {
    async function kafkaConsumer(topic = process.env.KAFKA_MAIN_TOPIC) {
        fastify.log.trace('consumerPlugin starts');

        try {
            const kafka = await fastify.kafka_instance();
            const consumer = await kafka.consumer({ groupId: 'streamer-group' });

            await consumer.connect();
            fastify.log.trace('consumerPlugin: consumer connected successfully');

            await consumer.subscribe({ topic: topic, fromBeginning: true });
            fastify.log.trace('consumerPlugin: consumer subscribed to topic %s', topic);

            await consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    console.log('topic: ', topic, 'message: ', message.value.toString())
                    fastify.log.trace('consumerPlugin: topic, partition%O, %O', topic, partition);
                    fastify.log.trace('consumerPlugin: message %O', message.value);
                }
            })
            fastify.log.trace('consumerPlugin ends');
        } catch (error) {
            fastify.log.error('consumerPlugin: error while consuming message from topic %s, %O', topic, error);
            throw new Error('error while consuming messages', error);
        }

    }
    fastify.decorate('kafka_consumer', kafkaConsumer);
}
module.exports = fp(consumerPlugin);