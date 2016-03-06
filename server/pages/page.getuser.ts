import sdk = require('../sdk');
import modelUser = require('../models/model.user');
import typesRest = require('../../shared/types/types.rest');
import typesPage = require('../types/types.page');

class GetUserPage implements typesPage.Page {
    run(inputData: any, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
        if (!sessionData.user) {
            callback(new typesRest.RestGetUserResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.user_id) {
            modelUser.model.findById(inputData.user_id).exec(function (err, result: modelUser.User) {
                callback(new typesRest.RestGetUserResult(typesRest.RestResultType.Ok, sdk.user.exportUser(result)));
            });
        }
        else {
			callback(new typesRest.RestGetUserResult(typesRest.RestResultType.Ok, sessionData.user));
        }
    }
}
export = GetUserPage;