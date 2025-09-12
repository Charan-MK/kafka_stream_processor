const healthRoute = require('../../routes/kafka.route');
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
        jest.spyOn(fastify, 'kafka_producer').mockReturnValue(Promise.resolve(true));

        const res = await fastify.inject({
            method: 'POST',
            url: '/kafka-publish',
            body: {
                sample: 'test message'
            }
        });

        expect(res.statusCode).toBe(200);
    });

    it('should return 500 status', async () => {
        jest.spyOn(fastify, 'kafka_producer').mockRejectedValue(false);


        const res = await fastify.inject({
            method: 'POST',
            url: '/kafka-publish',
            body: {
                sample: 'test message'
            }
        });

        expect(res.statusCode).toBe(500);
    });
});