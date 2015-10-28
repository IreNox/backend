var sdk = require('../sdk');
var modelUser = require('../models/model.user');
var GetUserPage = (function () {
    function GetUserPage() {
    }
    GetUserPage.prototype.run = function (inputData, sessionData, callback) {
        var obj = { result: "Unknown" };
        if (!sessionData.user) {
            obj.result = "NotLoggedin";
            callback(200, obj);
        }
        else if (inputData.user_id) {
            modelUser.model.findById(inputData.user_id).populate('friends').exec(function (err, result) {
                obj.result = "Ok";
                obj.user = sdk.user.exportUser(result);
                callback(200, obj);
            });
        }
        else {
            obj.result = "Ok";
            obj.user = sdk.user.exportUser(sessionData.user);
            callback(200, obj);
        }
    };
    return GetUserPage;
})();
module.exports = GetUserPage;
//# sourceMappingURL=page.getuser.js.map