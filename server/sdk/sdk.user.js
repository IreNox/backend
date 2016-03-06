var modelUser = require('../models/model.user');
var typesRest = require('../types/types.rest');
var validFields = [
    'username',
    'points'
];
var SdkUser = (function () {
    function SdkUser() {
    }
    SdkUser.prototype.findUser = function (user_id, callback) {
        modelUser.model.findById(user_id).exec(callback);
    };
    SdkUser.prototype.saveUser = function (user, sessionData, callback) {
        if (user._id.toHexString() != sessionData.user.id) {
            callback(typesRest.RestResultType.InvalidCall);
        }
        else {
            user.save(function (err) {
                if (err) {
                    callback(typesRest.RestResultType.DatabaseError);
                }
                else {
                    sessionData.user = user;
                    callback(typesRest.RestResultType.Ok);
                }
            });
        }
    };
    SdkUser.prototype.exportUser = function (user) {
        var result = new typesRest.RestUser();
        validFields.forEach(function (key) {
            result[key] = user[key];
        });
        result.id = user._id.toHexString();
        console.log(user.friends);
        result.friends = user.friends.map(function (value) { return value.toHexString(); });
        return result;
    };
    return SdkUser;
})();
module.exports = SdkUser;
//# sourceMappingURL=sdk.user.js.map