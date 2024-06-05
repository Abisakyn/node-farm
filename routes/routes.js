const express = require('express');
const {  signup } = require('../app/controllers/users/create_user');
const { verifyEmail } = require('../app/controllers/users/verify_email');
const { loginUser } = require('../app/controllers/users/login_user');
const { AddTours } = require('../app/controllers/tours/add_tours');
const {protect}=require('../app/controllers/users/protect')


const router = express.Router();

router.post('/create/user', signup);
router.post('/verifyEmail',verifyEmail);
router.post('/login',loginUser)
router.post('/add-tours',AddTours)

module.exports = router;
