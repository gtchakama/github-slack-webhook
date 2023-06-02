const express = require('express');
const bodyParser = require('body-parser');
const { WebClient } = require('@slack/web-api');

// Create a new Express app
const app = express();

// Use body-parser middleware to parse incoming requests
app.use(bodyParser.json());

// Initialize the Slack Web API client
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

// Define the Slack channel to send messages to
const slackChannel = '#general';

// Define the route that will receive the GitHub webhook payload
app.post('/github-webhook', async (req, res) => {
  const payload = req.body;

  // Check if the payload is a pull request event and if it's a new pull request
  if (payload.action === 'opened' && payload.pull_request) {
    try {
      // Get the relevant information from the payload
      const pullRequestId = payload.number;
      const pullRequestTitle = payload.pull_request.title;
      const pullRequestUrl = payload.pull_request.html_url;

      // Construct the message to send to Slack
      const message = `New Pull Request created!\nID: ${pullRequestId}\nTitle: ${pullRequestTitle}\nURL: ${pullRequestUrl}`;

      // Send the message to Slack
      await slackClient.chat.postMessage({
        channel: slackChannel,
        text: message,
      });
      console.log('Message sent to Slack');
    } catch (error) {
      console.error(error);
    }
  }

  res.sendStatus(200);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
