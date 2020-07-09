var router = require('express').Router()
// var express = require('express');
// var router = express.Router();
var jwt = require('jsonwebtoken');
var path = require('path');
var UserService = require('../service/userService');
var ContentModel = require('../model/contentModel')

router.get('/news',function(req,res,next){
    var token = req.cookies.token
    var decode = jwt.verify(token, 'your_jwt_secret')
    UserService.findById(decode._id).then(function(data){
        try {
            var token = req.cookies.token
            var decode = jwt.verify(token,'your_jwt_secret')
            UserService.findById(decode._id).then(function(data){
              if(data){
                next()
              }
            })
          } catch (error) {
            if(error.message=='jwt must be provided'){
              res.json('ban chua dang nhap')
            }
          }
    })
  }
  ,function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/content.html'))
});
  
router.get('/create',function(req,res,next){
    try {
      var token = req.cookies.token
      var decode = jwt.verify(token,'your_jwt_secret')
      UserService.findById(decode._id).then(function(data){
        if(data){
          next()
        }
      })
    } catch (error) {
      if(error.message=='jwt must be provided'){
        res.json('ban chua dang nhap')
      }
    }
  },
  function(req,res){
    res.sendFile(path.join(__dirname,'../views/create.html'))
});

router.get('/content',function(req,res){
    UserService.getAll().then(function(data){
      res.json(data)
    })
}); 

router.put('/content/:id',function(req,res,next){
    try {
      var token = req.cookies.token
      var decode = jwt.verify(token,'your_jwt_secret')
      UserService.findById(decode._id).then(function(data){
        if(data){
          next()
        }
      })
    } catch (error) {
      if(error.message=='jwt must be provided'){
        res.json('ban chua dang nhap')
      }
    }
  }
  ,function (req, res, next) {
    var id = req.params.id;
    var title = req.body.title;
    var content = req.body.content;
    var author = req.body.author;
    var userInfor = {}
    if (title) {
        userInfor.title = title
    }
    if (content) {
        userInfor.content = content
    }
    if (author) {
        userInfor.author = author
    }
    ContentModel.updateOne({
        _id: id
    }, userInfor).then(function(data) {
        res.json(data)
    })}
);
  
router.delete('/content/:id',function(req,res,next){
    try {
      var token = req.cookies.token
    var decode = jwt.verify(token,'your_jwt_secret')
    UserService.findById(decode._id).then(function(data){
      if(data){
        next()
      }
    })
    } catch (error) {
      res.json('ban chua dang nhap')
    }
  }
,function (req, res, next) {
    var id = req.params.id
    UserService.delContent(id).then(function (data) {
      res.json('xoa thanh cong ')
    })
});

router.post('/create',function(req,res,next){
    try {
    var token = req.cookies.token
    var decode = jwt.verify(token,'your_jwt_secret')
    UserService.findById(decode._id).then(function(data){
      if(data){
        next()
      }
    })
    } catch (error) {
      res.json('ban chua dang nhap')
    }
  },function (req, res, next) {
    var title = req.body.title
    var content = req.body.content
    var author = req.body.author
    UserService.addNew(title, content, author).then(function (data) {
      res.json({
        data:data,
        message:'tao bai viet thanh cong'
      })
    })
});
  
router.get('/page/:numPage',function(req,res,next){
    var numPage = req.params.numPage
    var dataPage = 2
    UserService.page(numPage,dataPage).then(function(data){
      res.json(data)
    })
});

module.exports = router;