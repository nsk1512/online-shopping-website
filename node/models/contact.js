var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String , required: true},
    message: {type: String, required: true}

});

module.exports = mongoose.model('contact', schema);
