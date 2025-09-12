// __mocks__/kafkajs.js

module.exports = {
  Kafka: jest.fn().mockImplementation(() => ({
    producer: jest.fn().mockReturnValue({
      connect: jest.fn(),
      send: jest.fn(({message, topic}) => {
        if(!topic || message) {
          return Promise.reject('no topic or message found');
        } else {
          return jest.fn();
        }
      }),
      disconnect: jest.fn(),
    }),
    consumer: jest.fn().mockReturnValue({
      connect: jest.fn(),
      subscribe: jest.fn(),
      run: jest.fn(),
      disconnect: jest.fn(),
      commitOffsets: jest.fn(),
    }),
  })),
};
