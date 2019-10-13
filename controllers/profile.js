const router = require('express').Router();
const isLoggedIn = require('../middleware/isLoggedIn')
let db = require('../models')

// GET /profile
router.get('/',isLoggedIn , (req, res) => {
  db.patient.findAll({
    where: {id: req.user.id}
})
.then(measurements => {
  res.render('profile/index', { measurements })
})
});

// GET /profile/admin
router.get('/admin', (req, res) => {
  res.render('profile/admin');
});

module.exports = router;
