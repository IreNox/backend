var models = require("../models.js");
var sdk = require('../sdk.js');

module.exports = {
	run: function (inputData, sessionData, callback) {
		var obj = { result: "Unknown" };

		if (sessionData.user) {
			obj.result = "AlreadyLoggedin";
	    	callback(200, obj);
		}
		else if (!inputData.username || (!inputData.login_token && !inputData.password))
		{
			obj.result = "InvalidCall";
			callback(200, obj);
		}
		else {
			models.user.findOne({ username: inputData.username }, function (err, result) {
				if (err) {
					obj.result = "DatabaseError";
					callback(200, obj);
				}
				else if (result) {
					obj.result = "AlreadyInuse";
					callback(200, obj);
				}
				else {
					obj.result = "Ok";

					var userData = { username: inputData.username };
					if (inputData.password)
					{
						userData.password_salt = sdk.crypt.md5_salt();
						userData.password = sdk.crypt.salt(inputData.password, userData.password_salt);
					}

					if (inputData.login_token)
					{
						userData.login_token = inputData.login_token;
					}

					user = new models.user(userData);
					user.save(function (err) {
						if (err) {
							obj.result = "DatabaseError";
						}
						else {
							obj.user_id = user._id;
							sessionData.user = user;

							callback(200, obj);
						}
					});
				}
			});
		}
	}
};
