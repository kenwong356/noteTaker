const router = require('express').Router();
const apiRouter = require('./apiroutes.js');

router.use('/notes', apiRouter);

module.exports = router;