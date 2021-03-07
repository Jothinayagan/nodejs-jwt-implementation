const router = require('express').Router();

// Import controllers
const authentication = require('./controllers/authentication');

router.post('/userRegistration', authentication.userRegistration);
router.post('/login', authentication.userLogin)

module.exports = router;