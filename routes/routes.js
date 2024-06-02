const express = require('express');
const {  signup } = require('../app/controllers/users/create_user');
const { verifyEmail } = require('../app/controllers/users/verify_email');

const router = express.Router();

router.post('/create/user', signup);
router.post('/verifyEmail',verifyEmail);

module.exports = router;
