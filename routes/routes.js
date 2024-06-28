const express = require('express');
const {  signup } = require('../app/controllers/users/create_user');
const { verifyEmail } = require('../app/controllers/users/verify_email');
const { loginUser } = require('../app/controllers/users/login_user');
const { AddTours } = require('../app/controllers/tours/add_tours');
const {protect,restrictTo}=require('../app/controllers/users/protect');
const { forgotPassword } = require('../app/controllers/users/forgot_password');
const { resetPassword } = require('../app/controllers/users/reset_password');
const { updatePassword } = require('../app/controllers/users/update_password');
const { nearbyTours } = require('../app/controllers/tours/nearby_tours');
const { getAllTours } = require('../app/controllers/tours/get_tours');


const router = express.Router();

router.post('/create/user', signup);
router.post('/verifyEmail',verifyEmail);
router.post('/login',loginUser)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)
router.patch('/updateMyPassword/:id',protect,updatePassword)
router.post('/add-tours',protect,restrictTo('admin'), AddTours)
router.get('/get-alltours',protect,getAllTours)
router.get('/nearby-tours/:lat/:lng', protect,nearbyTours);

module.exports = router;
