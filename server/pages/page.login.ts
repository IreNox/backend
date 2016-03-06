import sdk = require('../sdk');
import modelUser = require('../models/model.user');
import typesRest = require('../types/types.rest');
import typesPage = require('../types/types.page');

class LoginPage implements typesPage.Page {
    run(inputData: any, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
        if (sessionData.user) {
            callback(new typesRest.RestLoginResult(typesRest.RestResultType.AlreadyLoggedin, sessionData.user_id));
        }
        else if (!inputData.username || (!inputData.login_token && !inputData.password)) {
            callback(new typesRest.RestLoginResult(typesRest.RestResultType.InvalidCall, typesRest.InvalidUserId));
        }
        else {
			var regex = new RegExp(inputData.username, "i");
            modelUser.model.findOne({ username: regex }, function (err, result: modelUser.User) {
				var resultType: typesRest.RestResultType = typesRest.RestResultType.InvalidCall;

				sessionData.user_id = typesRest.InvalidUserId;
				sessionData.user = null;

                if (err || !result) {
                    resultType = typesRest.RestResultType.NotFound;
                }
                else if (inputData.login_token && inputData.login_token != result.login_token) {
                    resultType = typesRest.RestResultType.InvalidToken;
                }
                else if (sdk.crypt.salt(inputData.password, result.password_salt) != result.password) {
                    resultType = typesRest.RestResultType.InvalidPassword;
                }
                else {
                    resultType = typesRest.RestResultType.Ok;

					sessionData.user_id = typesRest.RestUserId.fromDatabase(result);
                    sessionData.user = sdk.user.exportUser(result);
                }

                callback(new typesRest.RestLoginResult(resultType, sessionData.user_id));
            });
        }
    }
}
export = LoginPage;