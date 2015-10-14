var md5 = require('md5')
var crypto = require('crypto');

module.exports = {
	md5: function (str) {
		return md5(str);
	},
	md5_salt: function () {
		return crypto.randomBytes(128 / 8).toString('hex');
	},
	salt: function(password, salt) {
		return md5(password + salt)
	}
};