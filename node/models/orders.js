var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true },
    name: {type: String, required: true},

});

module.exports = mongoose.model('orders', schema);
