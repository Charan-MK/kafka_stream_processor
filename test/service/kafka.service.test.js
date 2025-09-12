const { KafkaService } = require('../../service/kafka.service');
const build = require('../server');

describe('Kafka route plugin test suite', () => {
    let fastify;
    let kafkaService;

    beforeAll(async () => {
        fastify = await build();
        kafkaService = new KafkaService(fastify);
    });

    afterAll(async () => {
        await fastify.close();
    })

    it('should log message reception', async () => {
        const logMock = jest.spyOn(fastify.log, 'trace').mockImplementationOnce(() => {});
        await kafkaService.messageHandler('test message')

        expect(logMock).toHaveBeenCalledWith('KafkaService: messageHandler - message received %O', 'test message');
    })
});