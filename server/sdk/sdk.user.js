"use strict";
const sdk = require("../sdk");
const modelUser = require("../models/model.user");
const typesRest = require("../types/types.rest");
let validFields = [
    "username"
];
let validCurrentUserFields = {
    "items": [],
    "gems": 0
};
class SdkUser {
    findUser(user_id, callback) {
        modelUser.model.findById(user_id).exec(callback);
    }
    saveUser(user, sessionData, callback) {
        if (user.id != sessionData.user.id) {
            callback(typesRest.RestResultType.InvalidCall);
        }
        else {
            user.save(function (err) {
                if (err) {
                    callback(typesRest.RestResultType.DatabaseError);
                }
                else {
                    sessionData.user = sdk.user.exportCurrentUser(user);
                    callback(typesRest.RestResultType.Ok);
                }
            });
        }
    }
    exportUser(user) {
        return this.exportUserInternal(user, false);
    }
    exportCurrentUser(user) {
        return this.exportUserInternal(user, true);
    }
    exportUserInternal(user, isCurrentUser) {
        var result = new typesRest.RestUser();
        validFields.forEach(function (key) {
            result[key] = user[key];
        });
        result.id = user.id;
        result.friends = user.friends.map(value => value.toHexString());
        if (isCurrentUser) {
            for (var field in validCurrentUserFields) {
                result[field] = user[field].items || validCurrentUserFields[field];
            }
        }
        return result;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkUser;
//# sourceMappingURL=sdk.user.js.map