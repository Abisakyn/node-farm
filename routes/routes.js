const express = require('express');
const {  signup } = require('../app/controllers/users/create_user');
const { verifyEmail } = require('../app/controllers/users/verify_email');
const { loginUser } = require('../app/controllers/users/login_user');
const { AddTours } = require('../app/controllers/tours/add_tours');
const {protect,restrictTo}=require('../app/controllers/users/protect');
const { forgotPassword } = require('../app/controllers/users/forgot_password');
const { resetPassword } = require('../app/controllers/users/reset_password');


const router = express.Router();

router.post('/create/user', signup);
router.post('/verifyEmail',verifyEmail);
router.post('/login',loginUser)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)
router.post('/add-tours',protect,restrictTo('admin'), AddTours)

module.exports = router;
