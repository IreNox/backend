"use strict";
const sdk = require('../sdk');
const modelUser = require('../models/model.user');
const typesRest = require('../../shared/types/types.rest');
class GetUsersPage {
    run(inputData, sessionData, callback) {
        if (!sessionData.user) {
            callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.user_ids) {
            modelUser.model.find({ '_id': { $in: inputData.user_ids } }).exec(function (err, result) {
                callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.Ok, result.map(value => sdk.user.exportUser(value))));
            });
        }
        else {
            callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.InvalidCall));
        }
    }
}
module.exports = GetUsersPage;
//# sourceMappingURL=page.getusers.js.map