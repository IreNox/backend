"use strict";
const sdk = require('../sdk');
const modelUser = require('../models/model.user');
const typesRest = require('../../shared/types/types.rest');
class SignupPage {
    run(inputData, sessionData, callback) {
        if (sessionData.user) {
            callback(new typesRest.RestLoginResult(typesRest.RestResultType.AlreadyLoggedin));
        }
        else if (!inputData.username || (!inputData.login_token && !inputData.password)) {
            callback(new typesRest.RestLoginResult(typesRest.RestResultType.InvalidCall));
        }
        else {
            modelUser.model.findOne({ username: inputData.username }, function (err, result) {
                if (err) {
                    callback(new typesRest.RestLoginResult(typesRest.RestResultType.DatabaseError));
                }
                else if (result) {
                    callback(new typesRest.RestLoginResult(typesRest.RestResultType.AlreadyInUse));
                }
                else {
                    var user = new modelUser.model();
                    user.username = inputData.username;
                    if (inputData.password) {
                        user.password_salt = sdk.crypt.md5_salt();
                        user.password = sdk.crypt.salt(inputData.password, user.password_salt);
                    }
                    if (inputData.login_token) {
                        user.login_token = inputData.login_token;
                    }
                    user.save(function (err) {
                        if (err) {
                            callback(new typesRest.RestLoginResult(typesRest.RestResultType.DatabaseError));
                        }
                        else {
                            sessionData.user_id = sdk.user.getIdFromDatabase(user);
                            sessionData.user = sdk.user.exportUser(user);
                            callback(new typesRest.RestLoginResult(typesRest.RestResultType.Ok, sessionData.user_id));
                        }
                    });
                }
            });
        }
    }
}
module.exports = SignupPage;
//# sourceMappingURL=page.signup.js.map