module.exports = {
	run: function(inputData, sessionData, callback) {
	    var obj = { result: "Unknown" };

		if (sessionData.user) {
			obj.result = "Ok";

			sessionData.user = null;
		}
		else {
			obj.result = "NotLoggedin";
		}

	    callback(200, obj);
	}
};
