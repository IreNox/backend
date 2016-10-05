"use strict";
const sdk = require('../sdk');
const modelUser = require('../models/model.user');
const typesRest = require('../types/types.rest');
class LoginPage {
    run(inputData, sessionData, callback) {
        if (sessionData.user) {
            callback(new typesRest.RestLoginResult(typesRest.RestResultType.AlreadyLoggedin, sessionData.user.id));
        }
        else if (!inputData.username || (!inputData.login_token && !inputData.password)) {
            callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
        }
        else {
            var regex = new RegExp(inputData.username, "i");
            modelUser.model.findOne({ username: regex }, function (err, user) {
                if (err || !user) {
                    callback(new typesRest.RestResult(typesRest.RestResultType.NotFound));
                }
                else if (inputData.login_token && inputData.login_token != user.login_token) {
                    callback(new typesRest.RestResult(typesRest.RestResultType.InvalidToken));
                }
                else if (sdk.crypt.salt(inputData.password, user.password_salt) != user.password) {
                    callback(new typesRest.RestResult(typesRest.RestResultType.InvalidPassword));
                }
                else {
                    sessionData.user = sdk.user.exportCurrentUser(user);
                    callback(new typesRest.RestLoginResult(typesRest.RestResultType.Ok, sessionData.user.id));
                }
            });
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
//# sourceMappingURL=page.login.js.map