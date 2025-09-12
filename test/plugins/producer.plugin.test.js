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

    it('should call kafka producer.connect and producer.send functions', async () => {
        const logMock = jest.spyOn(fastify.log, 'trace').mockImplementation(() => { });
       
        await fastify.kafka_producer('message', 'test_topic');
        expect(logMock).toHaveBeenCalledWith('kafkaProducerPlugin: producer connected successfully');
        expect(logMock).toHaveBeenCalledWith(`kafkaProducerPlugin: message published successfully to topic %s`, 'test_topic');

    });

    it('should call kafka producer.connect and producer.send functions and log an error', async () => {
        const logMock = jest.spyOn(fastify.log, 'trace').mockImplementation(() => { });
       
        await fastify.kafka_producer();
        expect(logMock).toHaveBeenCalledWith('kafkaProducerPlugin: producer connected successfully');
        expect(logMock).not.toHaveBeenCalledWith(`kafkaProducerPlugin: message published successfully to topic %s`, 'test_topic');
    })
});
