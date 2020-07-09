var mongoose = require('../config/dbConnect');
var Schema = mongoose.Schema

var ContentSchema = new Schema({
    title:String,
    content:String,
    author:String,
    time:Date,

},{collection:'Content2v2'})

var ContentModel = mongoose.model('Content2v2',ContentSchema);

module.exports = ContentModel;