import * as sdk from '../sdk';
import * as modelUser from '../models/model.user';
import * as typesPage from '../types/types.page';
import * as typesRest from '../types/types.rest';

export default class FindUserPage implements typesPage.Page {
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
					var userId: string = sessionData.user.id;
					callback(
						new typesRest.RestFindUserResult(
							typesRest.RestResultType.Ok,
							result.filter(value => value.id != userId).map(value => sdk.user.exportUser(value))
						)
					);
                }
            });
        }
    }
}
