var sdk = require('../sdk');

module.exports = {
	run: function (inputData, sessionData, callback) {
		var obj = { result: "Unknown" };

		if (!sessionData.user) {
			obj.result = "NotLoggedin";
		}
		else {
			obj.result = "Ok";
			obj.user = sdk.user.exportUser(sessionData.user);
		}

		callback(200, obj);
	}
};
