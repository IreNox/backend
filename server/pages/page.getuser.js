"use strict";
var sdk = require("../sdk");
var modelUser = require("../models/model.user");
var typesRest = require("../types/types.rest");
var GetUserPage = (function () {
    function GetUserPage() {
    }
    GetUserPage.prototype.run = function (inputData, sessionData, callback) {
        if (!sessionData.user) {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.userId) {
            modelUser.model.findById(inputData.userId).exec(function (err, user) {
                if (sdk.db.checkError(err, callback)) {
                    callback(new typesRest.RestGetUserResult(sdk.user.exportUser(user)));
                }
            });
        }
        else {
            callback(new typesRest.RestGetUserResult(sessionData.user));
        }
    };
    return GetUserPage;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetUserPage;
//# sourceMappingURL=page.getuser.js.map