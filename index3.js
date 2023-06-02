const axios = require('axios');

// Replace this with your webhook URL
const webhookUrl = 'https://hooks.slack.com/services/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';

// This is the message you want to send
const message = {
  text: 'Hello, world!'
};

// Send the message
axios.post(webhookUrl, message)
  .then(function(response) {
    console.log('Message sent: ', response.data);
  })
  .catch(function(error) {
    console.error('Error sending message: ', error);
  });
