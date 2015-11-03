var modelUser = require('../models/model.user');
var typesRest = require('../types/types.rest');
var validFields = [
    '_id',
    'username'
];
var SdkUser = (function () {
    function SdkUser() {
    }
    SdkUser.prototype.findUser = function (user_id, callback) {
        modelUser.model.findById(user_id).populate('friends').exec(callback);
    };
    SdkUser.prototype.saveUser = function (user, sessionData, callback) {
        if (user._id != sessionData.user._id) {
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
        var result = { friends: [] };
        for (var index in validFields) {
            var key = validFields[index];
            result[key] = user[key];
        }
        for (var index in user.friends) {
            result.friends.push(this.exportUser(user.friends[index]));
        }
        return result;
    };
    return SdkUser;
})();
module.exports = SdkUser;
//# sourceMappingURL=sdk.user.js.map