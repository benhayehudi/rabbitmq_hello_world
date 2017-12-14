#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

// open up the channel
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    // define the queue
    let q = "hello";
    ch.assertQueue(q, {durable: false});

    console.log(" [*] Waiting for messages in %s. To exit process CTRL+C", q);

    // async function to receive the message
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
