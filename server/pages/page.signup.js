"use strict";
var sdk = require('../sdk');
var modelUser = require('../models/model.user');
var typesRest = require('../types/types.rest');
var SignupPage = (function () {
    function SignupPage() {
    }
    SignupPage.prototype.run = function (inputData, sessionData, callback) {
        if (sessionData.user) {
            callback(new typesRest.RestLoginResult(typesRest.RestResultType.AlreadyLoggedin, sessionData.user.id));
        }
        else if (!inputData.username || (!inputData.login_token && !inputData.password)) {
            callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
        }
        else {
            modelUser.model.findOne({ username: inputData.username }, function (err, result) {
                if (sdk.db.checkError(err, callback)) {
                    if (result) {
                        callback(new typesRest.RestResult(typesRest.RestResultType.AlreadyInUse));
                    }
                    else {
                        var user = new modelUser.model();
                        user.username = inputData.username;
                        if (inputData.password) {
                            user.password_salt = sdk.crypt.create_salt();
                            user.password = sdk.crypt.salt(inputData.password, user.password_salt);
                        }
                        if (inputData.login_token) {
                            user.login_token = inputData.login_token;
                        }
                        user.save(function (err) {
                            if (sdk.db.checkError(err, callback)) {
                                sessionData.user = sdk.user.exportUser(user, true);
                                callback(new typesRest.RestLoginResult(typesRest.RestResultType.Ok, sessionData.user.id));
                            }
                        });
                    }
                }
            });
        }
    };
    return SignupPage;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignupPage;
//# sourceMappingURL=page.signup.js.map