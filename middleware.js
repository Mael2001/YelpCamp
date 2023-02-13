module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.flash('error', 'You must Sign In first!');
        return res.redirect('/login');
    }
    next();
}