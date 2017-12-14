#!/usr/bin/env node

// require the amqp library
const amqp = require('amqplib/callback_api');

// connect to RabbitMQ server
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    // define two variables: q == queue & msg = message
    let q = "hello";
    let msg = "Hello World!";

    // set up the queue in the channel
    ch.assertQueue(q, {durable: false});
    // send to queue the message
    ch.sendToQueue(q, new Buffer(msg));

    // show us the successful sending of msg
    console.log(" [x] Sent %s", msg);
  });

  // after 500ms close connection & exit the process
  setTimeout(function() {conn.close(); process.exit(0) }, 500)
});
