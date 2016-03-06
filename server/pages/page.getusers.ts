import sdk = require('../sdk');
import modelUser = require('../models/model.user');
import typesRest = require('../types/types.rest')
import typesPage = require('../types/types.page')

class GetUsersPage implements typesPage.Page {
    run(inputData: any, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
        if (!sessionData.user) {
            callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.user_ids) {
            modelUser.model.find({ '_id': { $in: inputData.user_ids } }).exec(function (err, result: modelUser.User[]) {
                callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.Ok, result.map(value => sdk.user.exportUser(value))));
            });
        }
        else {
			callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.InvalidCall));
        }
    }
}
export = GetUsersPage;