const router = require('express').Router();
const db = require('../models');

const passport = require('../config/passportConfig');


router.get('/signup', (req, res) => {
    res.render('auth/signup');
})

//posting sign up info
router.post('/signup', (req, res, next) => {
  //checcking if the password entered is correct
  if (req.body.password !== req.body.password_verify) {
    req.flash('error', 'Incorrect Password');
    // console.log('Bday', req.body.birthday)
    //redirect to signup if the passwords don't match up
    res.redirect('/auth/signup');
  }
  else {
    // create the user (assuming doesn't exist)
    db.patient.findOrCreate({

      where: { email: req.body.email },
      defaults: req.body
    })
    .spread((patient, wasCreated) => {
      if (wasCreated) {
        // This was legitimately a new user, so they got created
        passport.authenticate('local', {
          successRedirect: '/profile',
          successFlash: 'Successfully signed up. Welcome!',
          failureRedirect: '/auth/login',
          failureFlash: 'Error, contact your local Admin.'
        })(req, res, next);
      }
      else {
        // Message if the patient already has a record. Redirect them to log in page
        req.flash('error', 'There is already an account for this user, please log in!');
        res.redirect('/auth/login');
      }
    })
    .catch(error => {
      //show error in console
      console.log('Post error --> /auth/signup', error);
      req.flash('error', 'Something went wrong!');

      // Get validation-speciic errors (okay to show to the user)
      if (error && error.errors) {
        //m for message errors
        error.errors.forEach(m => {
          if (m.type === 'Validation error') {
            req.flash('error', 'Validation issue - ' + m.message);
          }
        });
      }

      res.redirect('/auth/signup');
    })
  }
})

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  successFlash: 'You have logged in successfully',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid Credentials'
}));

router.get('/logout', (req, res) => {
    req.logout(); 
    //message once logged out
    req.flash('success', 'Goodbye, thanks for coming!');
    res.redirect('/');
});

module.exports = router;
