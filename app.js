const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const flash = require('connect-flash');
const passportLocal = require('passport-local').Strategy;

const app = express();

require('./config/passport')(passport);

app.use(express.static('public'));

app.use(expresslayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// const sess = {
//     secret: 'Super secret secret',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize
//     })
//   };
  
//   app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash);

app.use(() => (req, res, next) => {
    res.locals.success_msg = req.flash('succes_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3002;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
});