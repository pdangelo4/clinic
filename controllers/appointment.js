const router = require('express').Router();
let db = require('../models');
const loggedIn = require('../middleware/isLoggedIn');
const operators = require('sequelize/lib/operators');


router.get('/', loggedIn, (req, res) => {
    //pull the calendar appointment
    res.render('calendar/appointment', {
        data: []
    });
});


router.get('/events', loggedIn, (req, res) => {
    //getting the start of the event
    var start = req.query.start;
    //getting the end of the event
    var end = req.query.end;
    //patient or doctor declaration for the calendar usage
    var user = req.user;

    // console.log({params: req.params});

    //selecting all from appointment table for particular user logged in
    db.appointment
        .findAll({
            where: {
                patientId: user.id,

                scheduleStart: { [operators.gte]: start },

                scheduleStart: { [operators.lte]: end }
            }
        }) 
        .then(function(models) {
            //if database pull successful
            const modelParse = models.map(function(mode) {
                return {
                    id: mode.id,
                    title: mode.title,
                    start: mode.scheduleStart,
                    end: mode.scheduleEnd
                };
            });
            res.json(modelParse);
        })
        .catch(function(evnt) {
            //catch status
            res.status(500).json({
                error: {
                    code: 'events_list',
                    message: evnt.message
                }
            });
        });
});

router.post('/events', loggedIn, (req, res) => {
    //creating the event title
    var title = req.body.title;
    //creating the start date of the event
    var startDate = req.body.startDate;
    //event ending date
    var endDate = req.body.endDate;
    //declaring user variabe
    var user = req.user;
    //creating a new appointment
    db.appointment
        .create({
            patientId: user.id,
            title: title,
            scheduleStart: startDate,
            scheduleEnd: endDate,
            status: 'new'
        })
        .then(function(mes) {
            res.json(mes);
        })
        .catch(function(event) {
            // console.log(event);
            res.status(422).json({
                error: {
                    code: 'event_create_error',
                    message: event.message
                }
            });
        });
});

//rout for deleting appointment
router.delete('/events/:id', loggedIn, (req, res) => {
    //declare id for appointment
    var apptId = req.param('id');
    db.appointment
        .destroy({
            where: {
                id: apptId
            }
        })
        .then(function() {
            res.status(200).json({});
        })
        .catch(function(exports) {
            res.status(500).json({
                exports
            });
        });
});

//Need to use Patch instead of Put to make changes to part of the resource at a particular location...
router.patch('/events/:id', loggedIn, (req, res) => {
    //declard appointment Id 
    var apptId = req.param('id');
    //variable used to update body of the appointment event
    var updateDate = req.body;
    //updating the day with appointment
    db.appointment
        .update(updateDate, {
            where: {
                id: apptId
            }
        })
        .then(function(r) {
            return db.appointment.findByPk(apptId);
        })
        .then(function(mod) {
            res.status(200).json(mod);
        })
        .catch(function() {
            res.status(500).json({ event });
        });
});


module.exports = router;
