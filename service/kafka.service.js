class KafkaService {
    constructor(fastify) {
        this.fastify = fastify;
    }

    async messageHandler(message) {
        this.fastify.log.trace('KafkaService: messageHandler function starts');
        this.fastify.log.trace('KafkaService: messageHandler - message received %O', message);
        this.fastify.log.trace('KafkaService: messageHandler function ends');
    }
}
module.exports = { KafkaService };
