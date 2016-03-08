import * as sdk from '../sdk';
import * as modelUser from '../models/model.user';
import * as typesRest from '../types/types.rest';
import * as typesPage from '../types/types.page';

export default class GetUserPage implements typesPage.Page {
    run(inputData: any, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
        if (!sessionData.user) {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.user_id) {
            modelUser.model.findById(inputData.user_id).exec(function (err, user: modelUser.User) {
				if (sdk.db.checkError(err, callback)) {
					callback(new typesRest.RestGetUserResult(sdk.user.exportUser(user)));
				}
            });
        }
        else {
			callback(new typesRest.RestGetUserResult(sessionData.user));
        }
    }
}
