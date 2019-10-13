
module.exports = (req, res, next) => {

    // User logged in = true
    if (req.user) {
       //user successfully logged in, allow continuation
        next();
    }

    else {
        req.flash('error', 'You must be logged in to view this page!');
        //redirect to login in if not signed in
        res.redirect('/auth/login');
    }
}
