const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async (req, res) => {
    
}))

module.exports = router;