require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const moment = require('moment');
const passport = require('./config/passportConfig');
const session = require('express-session');
const flash = require('connect-flash');
const axios = require('axios');
// Instantiate the express app
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(function(req, res, next) {
    res.io = io;
    next();
});
// Set up any middleware or settings
app.set('view engine', 'ejs');
app.use(layouts);
app.use('/', express.static('static'));
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);
app.use(flash()); // After session!
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Custom middleware: write data to locals for EVERY page
app.use((req, res, next) => {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    res.locals.moment = moment;
    next();
});

// Controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));
app.use('/appointment', require('./controllers/appointment'));
app.use('/webchat', require('./controllers/webchat'));
app.use('/messages', require('./controllers/message'));
// app.use('/stock', require('./controllers/stock'));
// app.use('/search', require('./controllers/search'));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('*', (req, res) => {
    res.render('404');
});

app.get('/chat', (req, res) => {
    res.render('chat');
});

// LISTEN!
http.listen(process.env.PORT, process.env.HOST, () => {
    console.log('☕ Server is now running at port', process.env.PORT);
});
