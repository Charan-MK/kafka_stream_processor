module.exports = async (fastify) => {

    async function kafkaPublish(request, reply) {
        request.log.trace('Kafka Producer Route starts');
        try {
            await fastify.kafka_producer(request.body, process.env.KAFKA_MAIN_TOPIC);   
            reply.status(200).send({ msg: 'message publihed' });
        } catch (error) {
            fastify.log.error('error while publishing message to producer via route %O', error);
            request.log.trace('Kafka Producer Route ends');
            reply.send(500);
        }
        request.log.trace('Kafka Producer Route ends')
    }
    fastify.route({
        method: 'POST',
        url: '/kafka-publish',
        handler: kafkaPublish,
    });
}