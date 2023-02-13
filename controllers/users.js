const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
};

module.exports.registerNewUser = catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds')
        });
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
});

module.exports.renderLogInForm = (req, res) => {
    req.session.returnTo = req.session.returnTo
    res.render('users/login');
};

module.exports.logInUser = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logOutUser = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Successfully LogOut');
        res.redirect('/campgrounds')
    })
};