const build = require('../../test/server');

describe('Kafka Instance Plugin test suite', () => {
    let fastify;

    beforeAll(async () => {
        // setup code here
        fastify = await build();
    });

    afterAll(async () => {
        await fastify.close();
    })

    // Add your tests here
    it('should return kafka instance', async () => {
        const instance = await fastify.kafka_instance();
        expect(instance).not.toBe(null);
    })
});
