"use strict";
const sdk = require('../sdk');
const modelUser = require('../models/model.user');
const typesRest = require('../../shared/types/types.rest');
class GetUserPage {
    run(inputData, sessionData, callback) {
        if (!sessionData.user) {
            callback(new typesRest.RestGetUserResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.user_id) {
            modelUser.model.findById(inputData.user_id).exec(function (err, result) {
                callback(new typesRest.RestGetUserResult(typesRest.RestResultType.Ok, sdk.user.exportUser(result)));
            });
        }
        else {
            callback(new typesRest.RestGetUserResult(typesRest.RestResultType.Ok, sessionData.user));
        }
    }
}
module.exports = GetUserPage;
//# sourceMappingURL=page.getuser.js.map