var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    login_token: String,
    username: { type: String, unique: true },
    password: String,
    password_salt: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    points: Number
});

module.exports = mongoose.model('user', userSchema);
