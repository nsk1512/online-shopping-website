var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    type: {type: Number,required: true},
    rating: {type: Number, required: true},
    r1:{type: Number, required: true},
    r2:{type: Number, required: true},
    r3:{type: Number, required: true},
    r4:{type: Number, required: true},
    r5:{type: Number, required: true},
    n:{type: Number, required: true},
    total:{type: Number,required: true}



});

module.exports = mongoose.model('product', schema);
