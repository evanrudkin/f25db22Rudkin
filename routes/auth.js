var express = require('express');
var passport = require('passport');
var Account = require('../models/account');

var router = express.Router();

// --- Register Page ---
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// --- Register POST ---
router.post('/register', async (req, res, next) => {
  try {
    const user = await Account.register(
      new Account({ username: req.body.username }),
      req.body.password
    );
    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  } catch (err) {
    res.render('register', { title: 'Register', message: err.message });
  }
});

// --- Login Page ---
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// --- Login POST ---
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// --- Logout ---
router.get('/logout', (req, res) => {
  req.logout(() => {});
  res.redirect('/');
});

module.exports = router;
