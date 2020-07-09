var UserModel = require('../model/userModel');
var ContentModel = require('../model/contentModel')

function signup(email,password){
    return UserModel.create({
        email:email,
        password:password
    })
}

function login(email,password){
    return UserModel.find({
        email:email,
        password:password
    })
}

function logByEmail(email){
    return UserModel.find({
        email:email
    })
}

function findById(id){
    return UserModel.findOne({
        _id:id
    })
}

function getAll(){
    return ContentModel.find()
}
function updateContent(id,title,content,author){
    return ContentModel.updateOne({
        _id:id
    },{
        title:title,
        content:content,
        author:author
    })
}
function delContent(id){
    return ContentModel.deleteOne({
        _id:id
    })
}
function addNew(title,content,author){
    return ContentModel.create({
        title:title,
        content:content,
        author:author
    })
}

function page(numPage,dataPage){
    return ContentModel.find().skip((numPage-1)*dataPage).limit(dataPage)
}

module.exports = {
    signup,
    login,
    logByEmail,
    findById,
    updateContent,
    delContent,
    addNew,
    getAll,
    page
    }