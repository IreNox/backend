var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    login_token: String,
    username: { type: String, unique: true },
    password: String,
	password_salt: String,
	points:	Number
});

module.exports = mongoose.model('user', userSchema);
