var models = require("../models.js");
var sdk = require('../sdk');

module.exports = {
	run: function (inputData, sessionData, callback) {
		var obj = { result: "Unknown" };

		if (!sessionData.user) {
			obj.result = "NotLoggedin";
			callback(200, obj);
		}
		else if (inputData.user_id) {
			models.user.findById(inputData.user_id).populate('friends').exec(function (err, result) {
				obj.result = "Ok";
				obj.user = sdk.user.exportUser(result);
				callback(200, obj);
			});
		}
		else {
			obj.result = "Ok";
			obj.user = sdk.user.exportUser(sessionData.user);
			callback(200, obj);
		}
	}
};
