const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toursSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nameOfTheMovie:{
        type: String,
        required: true
    },
    image:[String],
    location:[
        {
            type: {
                type: String,
                default: 'Point', 
                enum:['Point']
            },
            coordinates: [Number], //latitude,longitude
            address: String,
            description: String
        }
    ]
});

module.exports = mongoose.model('Tour', toursSchema);