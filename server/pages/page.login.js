var sdk = require('../sdk');
var modelUser = require('../models/model.user');
var typesRest = require('../types/types.rest');
var LoginPage = (function () {
    function LoginPage() {
    }
    LoginPage.prototype.run = function (inputData, sessionData, callback) {
        if (sessionData.user) {
            callback(200, new typesRest.RestLoginResult(typesRest.RestResultType.AlreadyLoggedin, sessionData.user_id));
        }
        else if (!inputData.username || (!inputData.login_token && !inputData.password)) {
            callback(200, new typesRest.RestLoginResult(typesRest.RestResultType.InvalidCall, typesRest.InvalidUserId));
        }
        else {
            modelUser.model.findOne({ username: inputData.username }, function (err, result) {
                var resultType = typesRest.RestResultType.InvalidCall;
                sessionData.user_id = typesRest.InvalidUserId;
                sessionData.user = null;
                if (err || !result) {
                    resultType = typesRest.RestResultType.NotFound;
                }
                else if (inputData.login_token && inputData.login_token != result.login_token) {
                    resultType = typesRest.RestResultType.InvalidToken;
                }
                else if (sdk.crypt.salt(inputData.password, result.password_salt) != result.password) {
                    resultType = typesRest.RestResultType.InvalidPassword;
                }
                else {
                    resultType = typesRest.RestResultType.Ok;
                    sessionData.user_id = new typesRest.RestUserId(result._id.toHexString());
                    sessionData.user = result;
                }
                callback(200, new typesRest.RestLoginResult(resultType, sessionData.user_id));
            });
        }
    };
    return LoginPage;
})();
module.exports = LoginPage;
//# sourceMappingURL=page.login.js.map