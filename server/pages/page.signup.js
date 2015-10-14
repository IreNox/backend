var models = require("../models.js");
var sdk = require('../sdk.js');

module.exports = {
	run: function (data, callback) {
		var obj = { result: "Unknown" };

		if (!data.username || (!data.login_token && !data.password))
		{
			obj.result = "InvalidCall";
			callback(200, obj);

			return;
		}

		models.user.findOne({ username: data.username }, function (err, result) {
			if (err) {
				obj.result = "DatabaseError";
			}
			else if (result) {
				obj.result = "AlreadyInuse";
			}
			else {
				obj.result = "NewUser";

				var userData = { username: data.username };
				if (data.password)
				{
					userData.password_salt = sdk.crypt.md5_salt();
					userData.password = sdk.crypt.salt(data.password, userData.password_salt);
				}

				if (data.login_token)
				{
					userData.login_token = data.login_token;
				}

				user = new models.user(userData);
				user.save(function (err) {
					obj.result = "DatabaseError";
				});

				obj.name = user.username;
			}

			callback(200, obj);
		});
	}
};
