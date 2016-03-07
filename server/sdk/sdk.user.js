"use strict";
const sdk = require('../sdk');
const modelUser = require('../models/model.user');
const typesRest = require('../../shared/types/types.rest');
var validFields = [
    'username',
    'points'
];
class SdkUser {
    findUser(user_id, callback) {
        modelUser.model.findById(user_id).exec(callback);
    }
    saveUser(user, sessionData, callback) {
        if (user._id.toHexString() != sessionData.user.id) {
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
    }
    exportUser(user) {
        var result = new typesRest.RestUser();
        validFields.forEach(function (key) {
            result[key] = user[key];
        });
        result.id = user._id.toHexString();
        result.friends = user.friends.map(value => value.toHexString());
        return result;
    }
    getIdFromDatabase(value) {
        return new typesRest.RestUserId(value._id.toHexString());
    }
}
module.exports = SdkUser;
//# sourceMappingURL=sdk.user.js.map