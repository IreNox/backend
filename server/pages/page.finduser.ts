import sdk = require("../sdk");
import modelUser = require("../models/model.user");
import typesRest = require('../types/types.rest')
import typesPage = require('../types/types.page')

class FindUserPage implements typesPage.Page {
    run(inputData: any, sessionData: any, callback: typesPage.RestCallback): void {
        var obj: any = { result: "Unknown" };

        if (!inputData.username) {
            obj.result = "InvalidCall";
            callback(200, obj);
        }
        else if (!sessionData.user) {
            obj.result = "NotLoggedin";
            callback(200, obj);
        }
        else {
            var regex = new RegExp(inputData.username);
            modelUser.model.find({ username: regex }, function (err, result: modelUser.User[]) {
                if (err || !result) {
                    obj.result = "NotFound";
                }
                else {
                    obj.result = "Ok";

                    obj.users = [];
                    for (var index in result) {
                        var user = result[index];
                        if (user._id == sessionData.user._id) {
                            continue;
                        }

                        obj.users.push(sdk.user.exportUser(user));
                    }
                }

                callback(200, obj);
            });
        }
    }
}
export = FindUserPage;