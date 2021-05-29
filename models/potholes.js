const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const potholeSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        pothole: {
        longitude: {
                type: String,
                required: true
        },
        latitude: {
            type: String,
            required: true
        },
        file_name: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Pothole', potholeSchema);