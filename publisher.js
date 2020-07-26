// AMQP has a lot of clients and node JS has that client
// we require this promise based library
const amqp = require("amqplib")

// create a connection to the server which is on 5672


// create a json object

const msg = {number: 43}

connect();

async function connect() {

  try {
    // creating a TCP connection to rabbit server running on my machine
    // this is using the amqp protocol
    console.log("creating connection");
    const connection = await amqp.connect("amqp://localhost:5672");
    // create a channel for our connection
    console.log("create createChannel");
    const channel = await connection.createChannel();
    // now that we have a channel we need to publlish to a queue
    // assertQueue checks is the queue exisits on the server and if not it creates the queue
    console.log("creating queue");
    const result = await channel.assertQueue("jobs");
    console.log("Sending message to the queue");
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
    console.log("message sent ${msg.number}");


  } catch (ex) {
    console.error(ex);
  }

}
