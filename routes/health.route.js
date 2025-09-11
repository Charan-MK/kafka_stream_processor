module.exports = async (fastify) => {
    fastify.route({
        method: 'GET',
        url: '/heartbeat',
        async handler(request, reply) {
            request.log.trace('Health Route starts');
            reply.status(200).send({ health: 'in service' });
            request.log.trace('Health Route ends')
        }
    })
}