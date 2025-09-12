const fp = require('fastify-plugin');
const { KafkaService } = require('../../service/kafka.service');


async function consumerPlugin(fastify) {
    fastify.log.trace('consumerPlugin starts');
    const mainTopic = process.env.KAFKA_MAIN_TOPIC;
    try {
        async function processMessage(consumer, topic, partition, message) {
        const kafkaService = new KafkaService(fastify);
        const processedMessage  = {
            metadata: {
                topic: topic,
                messageReadTime: new Date().toISOString(),
            },
            message: message
        }

        await kafkaService.messageHandler(processedMessage);
        consumer.commitOffsets([{ topic, partition, offset: Number(message.offset + 1).toString() }])
    }
        
        const kafka = await fastify.kafka_instance();
        const consumer = await kafka.consumer({ groupId: 'streamer-group' });

        await consumer.connect();
        fastify.log.trace('consumerPlugin: consumer connected successfully');

        await consumer.subscribe({ topics: [mainTopic], fromBeginning: true });
        fastify.log.trace('consumerPlugin: consumer subscribed to topic %s', mainTopic);

        consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                fastify.log.trace('consumerPlugin: topic, partition %O, %O', topic, partition);
                fastify.log.trace('consumerPlugin: message %O', message.value.toString());
                await processMessage(consumer, topic, partition, JSON.parse(message.value.toString()));
            }
        })
    } catch (error) {
        fastify.log.error('consumerPlugin: error while consuming message from topic %s, %O', mainTopic, error);
    }
    fastify.log.trace('consumerPlugin ends');
}

module.exports = fp(consumerPlugin);