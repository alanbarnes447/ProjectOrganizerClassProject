var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var ourTeamRouter = require('./routes/our-team');

var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var signoutRouter = require('./routes/sign-out');
var dashboardRouter = require('./routes/dashboard');

var app = express();

require('./config/passport')(passport);

// MongoDB connection config
const MongoDB = require('./config/MongoDB-keys').MongoURI;
mongoose.connect(MongoDB, { useUnifiedTopology: true,
                            useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session var. setup
app.use(session({
  secret: 'If You Are Reading This It Is Too Late',
  resave: false,
  saveUninitialized: true
}));

// init flash
app.use(flash());

// set global variables for login notification
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.unverified = req.flash('unverified');
  next();
})

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/our-team', ourTeamRouter);

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/sign-out', signoutRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
