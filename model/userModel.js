var mongoose = require('../config/dbConnect');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String,
    role:{
        type:String,
        default:'user'
    }
},{collection:'user2v2'});

var UserModel = mongoose.model('user2v2',UserSchema);

module.exports = UserModel;
