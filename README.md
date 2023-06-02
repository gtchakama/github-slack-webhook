# GitSlack Tickets

GitSlack Tickets is an app that integrates GitHub and Slack to help you manage your project's issues. With GitSlack Tickets, you can get notified in Slack when new issues are created on GitHub, and create new issues right from Slack.

## Installation

To use this app, you'll need to have the following installed:

- Node.js (version 10 or higher)
- npm (version 6 or higher)
- A GitHub account with a personal access token
- A Slack workspace with a webhook URL (see [here](https://api.slack.com/messaging/webhooks) for instructions on how to set up a webhook)

Once you have everything installed and set up, you can clone this repository using this command:

```
git clone https://github.com/gtchakama/github-slack-webhook.git
```

Then, navigate to the directory where you cloned the repository and install any necessary dependencies using:

```
npm install
```

Next, create a file called `.env` in the root of the project, and add the following environment variables:

```
GITHUB_TOKEN=<your-personal-access-token>
SLACK_WEBHOOK_URL=<your-slack-webhook-url>
```

Finally, start the app using:

```
npm start
```

## Usage

The app has two routes:

1. GET `/new-issues`: Returns a JSON array of all issues opened in the last 24 hours.
2. POST `/create-issue`: Creates a new issue on GitHub and sends a notification to Slack. Expects a JSON payload with a `title` and `body` field.

To test the app, you can use a tool like Postman to make requests to these routes.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin feature/my-new-feature`)
5. Create a new pull request

## License

This project is licensed under the MIT license. See the `LICENSE` file for more details.

## Credits

This app was created by [George Chakama](https://twitter.com/gtchakama).