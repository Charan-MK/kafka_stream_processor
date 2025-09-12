const healthRoute = require('../../routes/health.route');
const build = require('../server');

describe('Kafka route plugin test suite', () => {
    let fastify;

    beforeAll(async () => {
        fastify = await build();
        fastify.register(healthRoute)
    });

    afterAll(async () => {
        await fastify.close();
    })

    it('should return 200 status', async () => {
        const res = await fastify.inject({
            method: 'GET',
            url: '/heartbeat',
        });

        expect(res.statusCode).toBe(200);
    })
});