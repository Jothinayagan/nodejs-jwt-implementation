const router = require('express').Router();

// Import controllers
const authentication = require('./controllers/authentication');

router.post('/userRegistration', authentication.registration);

module.exports = router;