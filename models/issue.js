async function getNewIssues(octokit) {
    try {
      const response = await octokit.issues.listForRepo({
        owner: 'gtchakama',
        repo: 'gt-chakama',
        since: new Date(new Date().getTime() - (60 * 60 * 24 * 1000)), // only get issues opened in the last 24 hours
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async function createIssue(octokit, title, body) {
    try {
      const response = await octokit.issues.create({
        owner: 'gtchakama',
        repo: 'gt-chakama',
        title,
        body,
      });
      const message = {
        text: `New issue created: ${title} (${response.data.html_url})`,
      };
      return message;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  module.exports = {
    getNewIssues,
    createIssue,
  };
  