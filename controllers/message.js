const router = require('express').Router();
const isLoggedIn = require('../middleware/isLoggedIn');
let db = require('../models');
const OP = require('sequelize/lib/operators');
// GET /appointment



router.get('/', isLoggedIn, (req, res) => {
    res.render('chat/message', {
        userId: req.user.id
    });
});
router.get('/history', function(req, res) {
    const to = req.query.to;
    const user = req.user;
    db.chat
        .findAll({
            where: {
                [OP.or]: [{ from: user.id, to }, { to: user.id, from: to }]
            },
            order: [['createdAt', 'ASC']]
        })
        .then(function(models) {
            res.json(models);
        })
        .catch(function(e) {
            res.json([]);
        });
});

router.post('/', isLoggedIn, (req, res) => {
    const fromUserId = req.body.from;
    const toUserId = req.body.to;
    const message = req.body.message;
    const data = {
        from: fromUserId,
        to: toUserId,
        message,
        timestamp: new Date().toJSON()
    };
    db.chat
        .create(data)
        .then(function(model) {
            res.io.emit('chat/' + fromUserId, data);
            res.io.emit('chat/' + toUserId, data);
            res.json(model);
        })
        .catch(function(e) {
            console.log(e);
        });
});

router.get('/chat', isLoggedIn, (req, res) => {
    res.json();
});
module.exports = router;
