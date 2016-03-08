import * as sdk from '../sdk';
import * as modelUser from '../models/model.user';
import * as typesRest from '../../shared/types/types.rest';
import * as typesPage from '../types/types.page';

export default class SignupPage implements typesPage.Page {
    run(inputData: any, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
		if (sessionData.user) {			
			callback(new typesRest.RestLoginResult(typesRest.RestResultType.AlreadyLoggedin));
		}
		else if (!inputData.username || (!inputData.login_token && !inputData.password)) {
			callback(new typesRest.RestLoginResult(typesRest.RestResultType.InvalidCall));
		}
		else {
			modelUser.model.findOne({ username: inputData.username }, function (err: any, result: modelUser.User) {
				if (err) {
					callback(new typesRest.RestLoginResult(typesRest.RestResultType.DatabaseError));
				}
				else if (result) {
					callback(new typesRest.RestLoginResult(typesRest.RestResultType.AlreadyInUse));
				}
				else {
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
							callback(new typesRest.RestLoginResult(typesRest.RestResultType.DatabaseError));
						}
						else {
							sessionData.user_id = sdk.user.getIdFromDatabase(user);
							sessionData.user = sdk.user.exportUser(user);

							callback(new typesRest.RestLoginResult(typesRest.RestResultType.Ok, sessionData.user_id));
						}
					});
				}
			});
		}
	}
}
