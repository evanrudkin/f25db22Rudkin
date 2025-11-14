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
var location = require("./models/location");
var resourceRouter = require("./routes/resource");

require('dotenv').config();
const mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('✅ Connected successfully to MongoDB');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/location', locationRouter);
app.use('/grid', gridRouter)
app.use('/randomitem', pickRouter);
app.use("/resource", resourceRouter);


const Location = require("./models/location");

// async function to delete all and insert new records
async function recreateDB() {
  // Delete everything first
  await Location.deleteMany();

  // Create several example locations (at least 3)
  const sampleLocations = [
    { Country: "United States", primaryLanguage: "English", population: 340100000 },
    { Country: "France", primaryLanguage: "French", population: 68520000 },
    { Country: "Japan", primaryLanguage: "Japanese", population: 124000000 }
  ];

  for (let loc of sampleLocations) {
    const instance = new Location(loc);
    await instance.save()
      .then(doc => console.log("💾 Saved:", doc.city))
      .catch(err => console.error("❌ Save error:", err));
  }
}

// Toggle this ONCE to seed, then comment it out after confirming data
let reseed = true;
if (reseed) {
  recreateDB();
}


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
