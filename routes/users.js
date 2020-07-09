var express = require('express');
var router = express.Router();
var UserService = require('../service/userService');
var jwt = require('jsonwebtoken');
var path = require('path');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var UserModel = require("../model/userModel")
/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../views/login.html'))
});

router.get('/signup',function(req,res){
  res.sendFile(path.join(__dirname,'../views/signup.html'))
})

router.post('/signup', function (req, res) {
  var email = req.body.email
  var password = req.body.password
  UserService.signup(email, password).then(function (data) {
    res.json(data)
  })
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json({
        message: 'Something is not right',
        error: true
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.json({
          message: 'Loi he thong',
          error: true
        });
      }
      const token = jwt.sign(user, 'your_jwt_secret',{expiresIn:'1d'});
      res.cookie('token', token);
      return res.json({ error: false, message: "Ban da dang nhap thanh cong",token:token });
    });
  })(req, res);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, cb) {
    UserModel.findOne({ email: email, password: password }).lean().then(function (user) {
      if (!user) {
        return cb(null, false);
      }
      return cb(null, user);
    }
    )
}));

router.get('/decode', function (req, res, next) {
  var token = req.cookies.token
  var jwtDecode = jwt.verify(token, 'your_jwt_secret')
  res.json(jwtDecode)
})

router.get('/logout', function (req, res) {
  req.logout();
  res.clearCookie('your_jwt_secret');
  res.redirect('/users/login');
});

module.exports = router;