"use strict";
const sdk = require("../sdk");
const modelUser = require("../models/model.user");
const typesRest = require('../../shared/types/types.rest');
class FindUserPage {
    run(inputData, sessionData, callback) {
        if (!inputData.username) {
            callback(new typesRest.RestFindUserResult(typesRest.RestResultType.InvalidCall));
        }
        else if (!sessionData.user) {
            callback(new typesRest.RestFindUserResult(typesRest.RestResultType.NotLoggedin));
        }
        else {
            var regex = new RegExp(inputData.username, "i");
            modelUser.model.find({ username: regex }, function (err, result) {
                if (err || !result) {
                    callback(new typesRest.RestFindUserResult(typesRest.RestResultType.NotFound));
                }
                else {
                    var userId = sessionData.user.id;
                    callback(new typesRest.RestFindUserResult(typesRest.RestResultType.Ok, result.filter(value => value._id.toHexString() != userId).map(value => sdk.user.exportUser(value))));
                }
            });
        }
    }
}
module.exports = FindUserPage;
//# sourceMappingURL=page.finduser.js.map