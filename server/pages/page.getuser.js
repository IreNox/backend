"use strict";
var sdk = require('../sdk');
var modelUser = require('../models/model.user');
var typesRest = require('../../shared/types/types.rest');
var GetUserPage = (function () {
    function GetUserPage() {
    }
    GetUserPage.prototype.run = function (inputData, sessionData, callback) {
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
    };
    return GetUserPage;
}());
module.exports = GetUserPage;
//# sourceMappingURL=page.getuser.js.map