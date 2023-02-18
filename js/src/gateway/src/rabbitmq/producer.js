const amqp = require("amqplib");
const config = require("./config");

let channel;

const createChannel = async () => {
  const connection = await amqp.connect(config.rabbitMQ.url);
  channel = await connection.createChannel();
};

const publishMessage = async (routingKey, message) => {
  if (!channel) {
    await createChannel();
  }

  const exchangeName = config.rabbitMQ.exchangeName;

  //direct is the type of exchange
  await channel.assertExchange(exchangeName, "direct");

  const logDetails = {
    logType: routingKey,
    message: message,
    dateTime: new Date(),
  };

  await channel.publish(
    exchangeName,
    routingKey,
    Buffer.from(JSON.stringify(logDetails))
  );
};

module.exports = publishMessage;
