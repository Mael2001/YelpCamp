const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
const passport = require('passport');

router.route('/register')
    .get(userController.renderRegisterForm)
    .post(userController.registerNewUser);

router.route('/login')
    .get(userController.renderLogInForm)
    .post(
        passport.authenticate('local',
            {
                failureFlash: true,
                failureRedirect: '/login'
            }), userController.logInUser);

router.get('/logout', userController.logOutUser);

module.exports = router;