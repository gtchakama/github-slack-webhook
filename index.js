// Import dependencies
const { Octokit } = require("@octokit/rest");
const dotenv = require('dotenv');
const Slack = require('slack-node');

// Load environment variables from .env file
dotenv.config();

// Initialize Octokit REST client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Initialize Slack client
const slack = new Slack();
slack.setWebhook(process.env.SLACK_WEBHOOK_URL);

// Listen for pull request events on GitHub repo
octokit.activity.listRepoEvents({
    owner: 'gtchakama',
    repo: 'gt-chakama',
    per_page: 100 // Set the number of events to return
}).then(result => {
    const pullRequests = result.data.filter(event => event.type === "PullRequestEvent" && event.payload.action === "opened")
    // Send messages to Slack for each new pull request
    pullRequests.forEach(pullRequest => {
        const message = `New Pull Request: ${pullRequest.payload.pull_request.title} - ${pullRequest.payload.pull_request.html_url}`;
        sendSlackMessage(message);
    });
}).catch(err => {
    console.error(`Error getting pull requests: ${err}`);
});

// Function to send messages to Slack
function sendSlackMessage(message) {
  slack.webhook({
    text: message,
    channel: "github-george",
    username: "GitHub Pull Requests"
  }, function(err, response) {
    if (err) {
      console.error(`Error sending message: ${err}`);
    } else {
      console.log(`Message sent: ${message}`);
    }
  });
}
