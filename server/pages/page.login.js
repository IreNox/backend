var models = require("../models.js");
var sdk = require('../sdk.js');

module.exports = {
	run: function(inputData, sessionData, callback) {
	    var obj = { result: "Unknown" };

		if (sessionData.user) {
			obj.result = "AlreadLoggedin";
	    	callback(200, obj);
		}
		else if (!inputData.username || (!inputData.login_token && !inputData.password)) {
	    	obj.result = "InvalidCall";
	    	callback(200, obj);
	    }
		else {
			models.user.findOne({ username: inputData.username }, function (err, result) {
				if (err || !result) {
					obj.result = "NotFound";
				}
				else if (inputData.login_token && inputData.login_token != result.login_token) {
					obj.result = "InvalidToken";
				}
				else if (sdk.crypt.salt(inputData.password, result.password_salt) != result.password) {
					obj.result = "InvalidPassword";
				}
				else {
					obj.result = "Ok";
					obj.name = result.username;
					
					sessionData.user = result;					
				}

				callback(200, obj);
			});
		}
	}
};
