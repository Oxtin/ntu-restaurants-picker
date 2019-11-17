var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
    name: String,
    position: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);