const axios = require('axios');

function sendSlackMessage(webhookUrl, message) {
  return axios.post(webhookUrl, message)
    .then(function(response) {
      console.log('Message sent: ', response.data);
    })
    .catch(function(error) {
      console.error('Error sending message: ', error);
      throw error;
    });
}

module.exports = {
  sendSlackMessage,
};
