const router = require('express').Router();

// Import controllers
const authController = require('./controllers/authentication');
const quoteController = require('./controllers/fetchQuotes');

router.post('/userRegistration', authController.userRegistration);
router.post('/login', authController.userLogin);
router.get('/fetchQuotes', quoteController.fetchQuotes)

module.exports = router;