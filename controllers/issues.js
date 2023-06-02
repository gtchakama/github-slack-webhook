const { Octokit } = require('@octokit/rest');
const issueModel = require('../models/issue');
const slackHelper = require('../helpers/slack');
const config = require('../config');

const octokit = new Octokit({
  auth: config.github.token,
});

async function getNewIssues(req, res) {
  try {
    const issues = await issueModel.getNewIssues(octokit);
    res.json(issues);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function createIssue(req, res) {
  const { title, body } = req.body;
  try {
    const issue = await issueModel.createIssue(octokit, title, body);
    await slackHelper.sendSlackMessage(config.slack.webhookUrl, issue);
    res.send('Issue created successfully');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

module.exports = {
  getNewIssues,
  createIssue,
};
