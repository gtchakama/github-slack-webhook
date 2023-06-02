const express = require('express');
const router = express.Router();
const issuesController = require('../controllers/issues');

router.get('/new-issues', issuesController.getNewIssues);
router.post('/create-issue', issuesController.createIssue);

module.exports = router;
