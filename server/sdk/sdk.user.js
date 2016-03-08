"use strict";
var sdk = require('../sdk');
var modelUser = require('../models/model.user');
var typesRest = require('../types/types.rest');
var validFields = [
    'username'
];
var SdkUser = (function () {
    function SdkUser() {
    }
    SdkUser.prototype.findUser = function (user_id, callback) {
        modelUser.model.findById(user_id).exec(callback);
    };
    SdkUser.prototype.saveUser = function (user, sessionData, callback) {
        if (user.id != sessionData.user.id) {
            callback(typesRest.RestResultType.InvalidCall);
        }
        else {
            user.save(function (err) {
                if (err) {
                    callback(typesRest.RestResultType.DatabaseError);
                }
                else {
                    sessionData.user = sdk.user.exportUser(user);
                    callback(typesRest.RestResultType.Ok);
                }
            });
        }
    };
    SdkUser.prototype.exportUser = function (user, isCurrentUser) {
        if (isCurrentUser === void 0) { isCurrentUser = false; }
        var result = new typesRest.RestUser();
        validFields.forEach(function (key) {
            result[key] = user[key];
        });
        result.id = user.id;
        result.friends = user.friends.map(function (value) { return value.toHexString(); });
        if (isCurrentUser) {
            result.gems = user.gems;
        }
        return result;
    };
    SdkUser.prototype.getIdFromDatabase = function (value) {
        return new typesRest.RestUserId(value.id);
    };
    return SdkUser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkUser;
//# sourceMappingURL=sdk.user.js.map