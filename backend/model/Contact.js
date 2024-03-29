const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    first_name: {type: String, default: null},
    last_name: {type: String, default: null},
    email: {type: String},
    phone: {type: String},
    relation: {type: String},
    location: {
        longitude: {type: Number},
        latitude: {type: Number}
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
});

module.exports = mongoose.model("contact", contactSchema);