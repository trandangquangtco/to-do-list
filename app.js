var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var MailModel = require('./model/mailModel')
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();
var jwt = require('jsonwebtoken')
require('dotenv').config();
var sendMail = require('./config/sendMail')
var cors = require('cors')
// view engine setup
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/index', indexRouter);

app.post('/sendmail',function(req,res,next){
  var to = req.body.email
  MailModel.create({email:to,password:req.body.password}).then(async function(data){
    var token = jwt.sign({email:data.email},'your_jwt_secret',{expiresIn:60*1000*5})
    console.log(token);
    var subject = 'test gui mail'
    var text = `
    <p>thu gui mail</p>
    <a href="http://localhost:3000/isActive/${token}">Xác nhận</a>
    <a href="http://localhost:3000/sendEmailAgain/${data._id}">Gửi lại email</a>`
    try {
      await sendMail(to,subject,text)
      res.render('sendMail')
    } catch (error) {
      res.json(error)
    }
  })
});

app.get('/isActive/:token',function(req,res,next){
  var token = req.params.token
  var decodeUser = jwt.verify(token,"your_jwt_secret");
  MailModel.updateOne({
    email:decodeUser.email
  },{
    isActive:true
  }).then(function(data){
    res.redirect("/users/signup")
  })
});

app.get('/sendMailAgain/:id',async function(req,res,next){
  var id = req.params.id
  var user = await MailModel.findOne({_id:id});
  var token = jwt.sign({email:user.email},"your_jwt_secret",{expiresIn:60*1000*5});
  var to = user.email;
  var subject="test gui mail"
  var html = `
    <p>test thu mail 5p</p>
    <a href="http://localhost:3000/isActive/${token}">Xác nhận</a>
    <a href="http://localhost:3000/sendEmailAgain/${data._id}">Gửi lại email</a>
  `
      try {
     var sendMail= await sendMail(to,subject,text);
       res.redirect("/users/login")
      } catch (error) {
        res.json(error)
      }
});

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
