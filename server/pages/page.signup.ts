import sdk = require('../sdk');
import modelUser = require('../models/model.user');
import typesRest = require('../types/types.rest')
import typesPage = require('../types/types.page')

class SignupPage implements typesPage.Page {
    run(inputData: any, sessionData: any, callback: typesPage.RestCallback): void {
		var obj: any = { result: "Unknown" };

		if (sessionData.user) {
			obj.result = "AlreadyLoggedin";
			callback(obj);
		}
		else if (!inputData.username || (!inputData.login_token && !inputData.password)) {
			obj.result = "InvalidCall";
			callback(obj);
		}
		else {
			modelUser.model.findOne({ username: inputData.username }, function (err: any, result: modelUser.User) {
				if (err) {
					obj.result = "DatabaseError";
					callback(obj);
				}
				else if (result) {
					obj.result = "AlreadyInuse";
					callback(obj);
				}
				else {
					obj.result = "Ok";

					var user: modelUser.User = <modelUser.User>new modelUser.model();
					user.username = inputData.username;

					if (inputData.password) {
						user.password_salt = sdk.crypt.md5_salt();
						user.password = sdk.crypt.salt(inputData.password, user.password_salt);
					}

					if (inputData.login_token) {
						user.login_token = inputData.login_token;
					}

					
					user.save(function (err) {
						if (err) {
							obj.result = "DatabaseError";
						}
						else {
							obj.user_id = user._id;
							sessionData.user = user;

							callback(obj);
						}
					});
				}
			});
		}
	}
}
export = SignupPage;