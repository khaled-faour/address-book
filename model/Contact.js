const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    first_name: {type: String, default: null},
    last_name: {type: String, default: null},
    email: {type: String, unique: true},
    phone: {type: String},
    relation: {type: String},
    location: {
        longitude: {type: Number},
        latitude: {type: Number}
    },
});

module.exports = mongoose.model("user", contactSchema);