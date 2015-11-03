import sdk = require('../sdk');
import modelUser = require('../models/model.user');
import typesRest = require('../types/types.rest')
import typesPage = require('../types/types.page')

class GetUserPage implements typesPage.Page {
    run(inputData: any, sessionData: any, callback: typesPage.RestCallback): void {
        var obj: any = { result: "Unknown" };

        if (!sessionData.user) {
            obj.result = "NotLoggedin";
            callback(200, obj);
        }
        else if (inputData.user_id) {
            modelUser.model.findById(inputData.user_id).populate('friends').exec(function (err, result: modelUser.User) {
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
    }
}
export = GetUserPage;