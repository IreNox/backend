import modelUser = require('../models/model.user');
import typesRest = require('../types/types.rest');

var validFields = [
    'username',
    'points'
];

class SdkUser {
    findUser(user_id: string, callback) {
        modelUser.model.findById(user_id).populate('friends').exec(callback);
    }

    saveUser(user: modelUser.User, sessionData: any, callback: typesRest.RestResultTypeCallback) {
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
    }

    exportUser(user: modelUser.User): typesRest.RestUser {
        var result: typesRest.RestUser;

		validFields.forEach(function (key: string) {
			result[key] = user[key];
		});

		result.id = new typesRest.RestUserId(user._id.toHexString());
		result.friends = user.friends.map((value: modelUser.User) => new typesRest.RestUserId(value._id.toHexString()));

        return result;
    }
}
export = SdkUser;