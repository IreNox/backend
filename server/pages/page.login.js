var models = require("../models.js");
var sdk = require('../sdk.js');

module.exports = {
	run: function(data, callback) {
	    var obj = { result: "Unknown" };

	    models.user.findOne({ username: data.username }, function (err, result) {
	        if (err || !result) {
		        obj.result = "NotFound";
	        }
	        else if (data.login_token && data.login_token != result.login_token) {
	        	obj.result = "InvalidToken";
	        }
	        else if (sdk.crypt.salt(data.password, result.password_salt) != result.password) {
	        	obj.result = "InvalidPassword";
	        }
		    else {
		        obj.result = "NoError";
		        obj.name = result.username;
	        }

		    callback(200, obj);
		});
	}
};
