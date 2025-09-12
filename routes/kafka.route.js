module.exports = async (fastify) => {

    async function kafkaPublish(request, reply) {
        request.log.trace('Kafka Producer Route starts');
        let response = {};
        try {
            await fastify.kafka_producer(request.body, process.env.KAFKA_MAIN_TOPIC);
            response.status = 200;
        } catch (error) {
            fastify.log.error('error while publishing message to producer via route %O', error);
            request.log.trace('Kafka Producer Route ends');
            response.status = 500
        }
        reply.status(response.status).send();
        request.log.trace('Kafka Producer Route ends')
    }
    fastify.route({
        method: 'POST',
        url: '/kafka-publish',
        handler: kafkaPublish,
    });
}