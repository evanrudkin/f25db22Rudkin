var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

// ------------------------------------
// INDEX PAGE
// ------------------------------------
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Location App',
    user: req.user
  });
});

// ------------------------------------
// REGISTER (GET)
// ------------------------------------
router.get('/register', function (req, res) {
  res.render('register', {
    title: 'Register',
    message: '',
    user: req.user
  });
});

// ------------------------------------
// REGISTER (POST)
// ------------------------------------
router.post('/register', function (req, res) {
  Account.findOne({ username: req.body.username })
    .then(function (user) {
      if (user != null) {
        console.log("exists " + req.body.username);
        return res.render('register', {
          title: 'Register',
          message: 'Existing User',
          account: req.body.username
        });
      }

      let newAccount = new Account({ username: req.body.username });
      Account.register(newAccount, req.body.password, function (err, user) {
        if (err) {
          console.log("db creation issue " + err);
          return res.render('register', {
            title: 'Register',
            message: 'Access error',
            account: req.body.username
          });
        }
        if (!user) {
          return res.render('register', {
            title: 'Register',
            message: 'Access error',
            account: req.body.username
          });
        }

        console.log("Success, redirect");
        res.redirect('/');
      });

    })
    .catch(function (err) {
      return res.render('register', {
        title: 'Register',
        message: 'Registration error',
        account: req.body.username
      });
    });
});

// ------------------------------------
// LOGIN (GET)
// ------------------------------------
router.get('/login', function (req, res) {
  res.render('login', {
    title: 'Login',
    user: req.user
  });
});

// ------------------------------------
// LOGIN (POST)
// ------------------------------------
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);

// ------------------------------------
// LOGOUT
// ------------------------------------
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// ------------------------------------
// PING (simple online test)
// ------------------------------------
router.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});

module.exports = router;
