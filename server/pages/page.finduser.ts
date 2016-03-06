import sdk = require("../sdk");
import modelUser = require("../models/model.user");
import typesRest = require('../types/types.rest')
import typesPage = require('../types/types.page')

class FindUserPage implements typesPage.Page {
    run(inputData: any, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
        if (!inputData.username) {
            callback(new typesRest.RestFindUserResult(typesRest.RestResultType.InvalidCall));
        }
        else if (!sessionData.user) {
            callback(new typesRest.RestFindUserResult(typesRest.RestResultType.NotLoggedin));
        }
        else {
            var regex = new RegExp(inputData.username, "i");
            modelUser.model.find({ username: regex }, function (err, result: modelUser.User[]) {
                if (err || !result) {
					callback(new typesRest.RestFindUserResult(typesRest.RestResultType.NotFound));
                }
                else {
					var userId: string = sessionData.user_id.toString(); 
					callback(
						new typesRest.RestFindUserResult(
							typesRest.RestResultType.Ok,
							result.filter(value => value._id.toHexString() != userId).map(value => sdk.user.exportUser(value))
						)
					);
                }
            });
        }
    }
}
export = FindUserPage;