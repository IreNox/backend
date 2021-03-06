﻿import * as sdk from '../sdk';
import * as modelUser from '../models/model.user';
import * as typesRest from '../types/types.rest';
import * as typesPage from '../types/types.page';

export default class GetUsersPage implements typesPage.Page {
    run(inputData: typesRest.RestGetUsersRequest, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
        if (!sessionData.user) {
            callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.userIds) {
            modelUser.model.find({ '_id': { $in: inputData.userIds } }).exec(function (err, result: modelUser.User[]) {
                callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.Ok, result.map(value => sdk.user.exportUser(value))));
            });
        }
        else {
			callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.InvalidCall));
        }
    }
}
