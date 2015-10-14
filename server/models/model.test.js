
var mongoose = require('mongoose');

var testSchema = mongoose.Schema(
{
	name: String
});

module.exports = mongoose.model('test', testSchema);
