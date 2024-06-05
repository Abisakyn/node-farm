const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toursSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tour', toursSchema);