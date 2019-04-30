const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    phone: Number,
    password: String,
    roles: Number
});

module.exports = mongoose.model('user', userSchema);
