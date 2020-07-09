var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project2v2', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected')
});

module.exports=mongoose