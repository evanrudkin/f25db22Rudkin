var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var locationRouter = require('./routes/location');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
var authRouter = require('./routes/auth');

require('dotenv').config();
const mongoose = require('mongoose');

const passport = require('passport');
const session = require('express-session');
const Account = require('./models/account');

// Initialize Express
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const connectionString = process.env.MONGO_CON;

mongoose.connect(connectionString)
  .catch(error => console.error("MongoDB connection error:", error));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected successfully to MongoDB');
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/location', locationRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);
app.use('/resource', resourceRouter);
app.use('/auth', authRouter); 

const Location = require("./models/location");

async function recreateDB() {
  await Location.deleteMany();

  const sampleLocations = [
    { Country: "United States", primaryLanguage: "English", population: 340100000 },
    { Country: "France", primaryLanguage: "French", population: 68520000 },
    { Country: "Japan", primaryLanguage: "Japanese", population: 124000000 }
  ];

  for (let loc of sampleLocations) {
    let instance = new Location(loc);
    try {
      let doc = await instance.save();
      console.log("Saved:", doc.Country);
    } catch (err) {
      console.error("Save error:", err);
    }
  }
}

let reseed = false;
if (reseed) recreateDB();

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
