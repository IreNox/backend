import * as sdk from '../sdk';
import * as modelUser from '../models/model.user';
import * as typesRest from '../../shared/types/types.rest';
import * as typesPage from '../types/types.page';

export default class LoginPage implements typesPage.Page {
    run(inputData: typesRest.RestLoginRequest, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
        if (sessionData.user) {
            callback(new typesRest.RestLoginResult(typesRest.RestResultType.AlreadyLoggedin, sessionData.user_id));
        }
        else if (!inputData.username || (!inputData.login_token && !inputData.password)) {
            callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
        }
        else {
			var regex = new RegExp(inputData.username, "i");
            modelUser.model.findOne({ username: regex }, function (err, user: modelUser.User) {
                if (err || !user) {
					callback(new typesRest.RestResult(typesRest.RestResultType.NotFound));
                }
                else if (inputData.login_token && inputData.login_token != user.login_token) {
					callback(new typesRest.RestResult(typesRest.RestResultType.InvalidToken));
                }
                else if (sdk.crypt.salt(inputData.password, user.password_salt) != user.password) {
					callback(new typesRest.RestResult(typesRest.RestResultType.InvalidPassword));
                }
                else {
					sessionData.user_id = sdk.user.getIdFromDatabase(user);
                    sessionData.user = sdk.user.exportUser(user, true);

					callback(new typesRest.RestLoginResult(typesRest.RestResultType.Ok, sessionData.user_id));
                }
            });
        }
    }
}
