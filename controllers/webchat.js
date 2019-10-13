const router = require('express').Router();
const loggedIn = require('../middleware/isLoggedIn');

//Get and render live video chat if logged in
router.get('/', loggedIn, (req, res) => {
    const user = req.user;
    res.render('webchat/chat', {
        user
    });
});


module.exports = router;
