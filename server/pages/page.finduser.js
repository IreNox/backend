"use strict";
var sdk = require('../sdk');
var modelUser = require('../models/model.user');
var typesRest = require('../types/types.rest');
var FindUserPage = (function () {
    function FindUserPage() {
    }
    FindUserPage.prototype.run = function (inputData, sessionData, callback) {
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
                    callback(new typesRest.RestFindUserResult(typesRest.RestResultType.Ok, result.filter(function (value) { return value.id != userId; }).map(function (value) { return sdk.user.exportUser(value); })));
                }
            });
        }
    };
    return FindUserPage;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FindUserPage;
//# sourceMappingURL=page.finduser.js.map