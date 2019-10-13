
module.exports = (req, res, next) => {

    // Checks to see if user is logged in
    if (req.user) {
        //move on if user logged in is true
        next();
    }

    else if (req.user) {
        req.flash('error', 'Sorry, you are not an administrator');
        //redirect to profile if logged in as admin
        res.redirect('/profile');
    }

    else {
        req.flash('error', 'You do not have the admin credentials to view this page');
        //redirect to login if not admin
        res.redirect('/auth/login');
    }
}