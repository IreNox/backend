import * as sdk from '../sdk';
import * as modelUser from '../models/model.user';
import * as typesRest from '../types/types.rest';
import * as typesPage from '../types/types.page';

export default class SignupPage implements typesPage.Page {
    run(inputData: any, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
		if (sessionData.user) {
			callback(new typesRest.RestLoginResult(typesRest.RestResultType.AlreadyLoggedin, sessionData.user.id));
		}
		else if (!inputData.username || (!inputData.login_token && !inputData.password)) {
			callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
		}
		else {
			modelUser.model.findOne({ username: inputData.username }, function (err: any, result: modelUser.User) {
				if (sdk.db.checkError(err, callback)) {
					if (result) {
						callback(new typesRest.RestResult(typesRest.RestResultType.AlreadyInUse));
					}
					else {
						var user: modelUser.User = <modelUser.User>new modelUser.model();
						user.username = inputData.username;

						if (inputData.password) {
							user.password_salt = sdk.crypt.create_salt();
							user.password = sdk.crypt.salt(inputData.password, user.password_salt);
						}

						if (inputData.login_token) {
							user.login_token = inputData.login_token;
						}

						user.save(function (err) {
							if (sdk.db.checkError(err, callback)) {
								sessionData.user = sdk.user.exportUser(user, true);

								callback(new typesRest.RestLoginResult(typesRest.RestResultType.Ok, sessionData.user.id));
							}
						});
					}	
				}
			});
		}
	}
}
