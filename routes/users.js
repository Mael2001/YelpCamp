const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
const passport = require('passport');

router.get('/register', userController.renderRegisterForm);

router.post('/register', userController.registerNewUser);

router.get('/login', userController.renderLogInForm);

router.post('/login',
    passport.authenticate('local',
        {
            failureFlash: true,
            failureRedirect: '/login'
        }), userController.logInUser);

router.get('/logout', userController.logOutUser);

module.exports = router;