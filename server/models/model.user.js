
var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
{
	name: String,
	password: String,
	points:	Number
});

module.exports = mongoose.model('user', userSchema);
