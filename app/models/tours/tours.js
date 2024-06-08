const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toursSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image:[String],
    secretTour:{
        type: Boolean,
        default: false
    },
    startLocation:{
        //GeoJSON
        type: {
            type: String,
            default: 'Point', 
            enum:['Point']
        },
        coordinates: [Number], //latitude,longitude
        address: String,
        description: String
    },
    locations:[
        {
            type: {
                type: String,
                default: 'Point', 
                enum:['Point']
            },
            coordinates: [Number], //latitude,longitude
            address: String,
            description: String,
            day: Number
        }
    ]
});

module.exports = mongoose.model('Tour', toursSchema);