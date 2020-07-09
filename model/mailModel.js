var mongoose = require("../config/dbConnect")
var Schema = mongoose.Schema;

var mailSchema= new Schema({
    email:String,
    password:String,
    isActive:{
        type:Boolean,
        default:false
    }
},{collection:'mail'})
var MailModel = mongoose.model("mail",mailSchema);
module.exports=MailModel;   