module.exports = async (fastify) => {

    async function kafkaPublish(request, reply) {
        request.log.trace('Kafka Producer Route starts');
        try {
            await fastify.kafka_producer({ sample: 'this is a sample message' }, process.env.KAFKA_MAIN_TOPIC);   
            reply.status(200).send({ msg: 'message publihed' });
        } catch (error) {
            fastify.log.error('error while publishing message to producer via route %O', error);
            request.log.trace('Kafka Producer Route ends');
            reply.send(500);
        }
        request.log.trace('Kafka Producer Route ends')
    }
    fastify.route({
        method: 'GET',
        url: '/kafka-publish',
        handler: kafkaPublish,
    })

    async function kafkaConsume(request, reply) {
        request.log.trace('Kafka Consumer Route starts');
        try {
            await fastify.kafka_consumer();   
            reply.status(200).send({ msg: 'messages consumed' });
        } catch (error) {
            fastify.log.error('error while publishing message to producer via route %O', error);
            request.log.trace('Kafka Consumer Route ends');
            reply.send(500);
        }
        request.log.trace('Kafka Consumer Route ends')
    }
    fastify.route({
        method: 'GET',
        url: '/kafka-consume',
        handler: kafkaConsume,
    })
}