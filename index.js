const { IncomingWebhook } = require('@slack/webhook');
const http = require('http');
const createHandler = require('github-webhook-handler');

const webhook = new IncomingWebhook('https://hooks.slack.com/services/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');
const handler = createHandler({ path: '/webhook', secret: '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' });

http.createServer(function (req, res) {
  handler(req, res, function () {
    res.statusCode = 404;
    res.end('Not Found');
  });
}).listen(8080);

handler.on('pull_request', function(event) {
  const message = {
    text: `New pull request from ${event.payload.sender.login}: ${event.payload.pull_request.title}`,
    attachments: [
      {
        fallback: event.payload.pull_request.title,
        title: event.payload.pull_request.title,
        title_link: event.payload.pull_request.html_url,
        color: "#36a64f",
        fields: [
          {
            title: "Author",
            value: event.payload.pull_request.user.login,
            short: true
          },
          {
            title: "Status",
            value: event.payload.pull_request.state,
            short: true
          }
        ]
      }
    ]
  };

  webhook.send(message)
    .then(() => console.log('Message sent'))
    .catch((error) => console.error(`Error sending message: ${error}`));
});

handler.on('push', function(event) {
  const message = {
    text: `New commit pushed to repo ${event.payload.repository.full_name}`,
    attachments: [
      {
        fallback: event.payload.commits[0].message,
        title: `${event.payload.commits.length} new commits`,
        title_link: event.payload.compare,
        color: "#36a64f",
        fields: [
          {
            title: "Author",
            value: event.payload.head_commit.author.username,
            short: true
          },
          {
            title: "Message",
            value: event.payload.head_commit.message,
            short: false
          }
        ]
      }
    ]
  };

  webhook.send(message)
    .then(() => console.log('Message sent'))
    .catch((error) => console.error(`Error sending message: ${error}`));
});
