"use strict";
const sdk = require('../sdk');
const modelUser = require('../models/model.user');
const typesRest = require('../types/types.rest');
class GetUsersPage {
    run(inputData, sessionData, callback) {
        if (!sessionData.user) {
            callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.userIds) {
            modelUser.model.find({ '_id': { $in: inputData.userIds } }).exec(function (err, result) {
                callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.Ok, result.map(value => sdk.user.exportUser(value))));
            });
        }
        else {
            callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.InvalidCall));
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetUsersPage;
//# sourceMappingURL=page.getusers.js.map