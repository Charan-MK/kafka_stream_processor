const consumerPlugin = require('../../plugins/kafka/consumer.plugin');
const build = require('../../test/server');

describe('Kafka Producer plugin test suite', () => {
    let fastify;

    beforeAll(async () => {
        fastify = await build();
    });

    afterAll(async () => {
        await fastify.close();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should call kafka consumer.connect and consumer.subscribe functions', async () => {
        const logMock = jest.spyOn(fastify.log, 'trace').mockImplementation(() => { });
       
        await fastify.register(consumerPlugin)
        expect(logMock).toHaveBeenCalledWith('consumerPlugin: consumer connected successfully');
        expect(logMock).toHaveBeenCalledWith('consumerPlugin: consumer subscribed to topic %s', 'test');

    });
});
