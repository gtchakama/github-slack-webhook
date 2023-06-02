require('dotenv').config();

module.exports = {
  github: {
    token: process.env.GITHUB_TOKEN,
  },
  slack: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
  },
};
