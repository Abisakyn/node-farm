const express = require('express');
const {  signup } = require('../app/controllers/users/create_user');
const { verifyEmail } = require('../app/controllers/users/verify_email');
const { loginUser } = require('../app/controllers/users/login_user');

const router = express.Router();

router.post('/create/user', signup);
router.post('/verifyEmail',verifyEmail);
router.post('/login',loginUser)

module.exports = router;
