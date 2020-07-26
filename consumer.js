const amqp = require("amqplib")

connect();

async function connect() {

  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");
    // we have to keep the consumer alive
    console.log("waiting for messages!!!");
    channel.consume("jobs", message => {
        console.log(message.content.toString());
        const input = JSON.parse(message.content.toString());
        console.log(`Received message with {input.number}`);
    })


  } catch (ex) {
    console.error(ex);
  }

}
