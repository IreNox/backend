var models = require('../models.js');

var validFields = [
	'_id',
	'username'
];

module.exports = {
	findUser: function (user_id, callback) {
		models.user.findById(user_id).populate('friends').exec(callback);
	},
	saveUser: function (user, sessionData, callback) {
		if (user._id != sessionData.user._id) {
			callback('InvalidCall');
		}
		else {
			user.save(function (err) {
				if (err) {
					callback('DatabaseError');
				}
				else {
					sessionData.user = user;
					callback('Ok');
				}
			});
		}
	},
	exportUser: function (user) {
		var result = {};

		for (var index in validFields) {
			var key = validFields[index];
			result[key] = user[key];
		}

		result.friends = [];
		for (var index in user.firends) {
			result.friends.push(module.exports.exportUser(user.friends[index]));
		}
		
		return result;
	}
};
