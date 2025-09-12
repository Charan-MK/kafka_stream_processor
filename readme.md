# Kafka Stream Processor

A microservice to produce and consume messages using Kafka, built with Fastify.

## Features

- Kafka producer and consumer support via [kafkajs](https://www.npmjs.com/package/kafkajs)
- Modular plugin architecture for Kafka and general utilities
- Health check route
- Environment-based configuration

## Folder Structure

```
.env
.env.example           # Example environment variables
.gitignore
app.js                 # Main application entry point
eslint.config.mjs      # ESLint configuration
package.json           # Project metadata and scripts

plugins/
  general/
    kafka.instance.plugin.js   # Kafka instance creation plugin
  kafka/
    consumer.plugin.js         # Kafka consumer plugin
    producer.plugin.js         # Kafka producer plugin

routes/
  health.route.js      # Health check route
  kafka.route.js       # Kafka publish route

service/
  kafka.service.js     # Kafka message handler service
```

## Getting Started

### Prerequisites

- Node.js >= 18
- Kafka broker

### Installation

```sh
npm install
```

### Configuration

Copy `.env.example` to `.env` and fill in your Kafka and app settings:

```sh
cp .env.example .env
```

Edit `.env`:

```
APP_PORT=3000
APP_HOST_IP=127.0.0.1
KAFKA_BROKER=your_kafka_broker:9092
KAFKA_MAIN_TOPIC=your_topic
```

### Running the Service

```sh
npm start
```

Or for development with auto-reload:

```sh
npm run dev
```

### API Endpoints

- `GET /heartbeat`  
  Health check endpoint. Returns `{ health: 'in service' }`.

- `POST /kafka-publish`  
  Publishes a message to the Kafka topic specified in `KAFKA_MAIN_TOPIC`.

### Linting

```sh
npm run lint
```

## License

ISC