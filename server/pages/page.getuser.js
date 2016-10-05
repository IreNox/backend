"use strict";
const sdk = require("../sdk");
const modelUser = require("../models/model.user");
const typesRest = require("../types/types.rest");
class GetUserPage {
    run(inputData, sessionData, callback) {
        if (!sessionData.user) {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.userId) {
            modelUser.model.findById(inputData.userId).exec(function (err, user) {
                if (sdk.db.checkError(err, callback)) {
                    callback(new typesRest.RestGetUserResult(sdk.user.exportUser(user)));
                }
            });
        }
        else {
            callback(new typesRest.RestGetUserResult(sessionData.user));
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetUserPage;
//# sourceMappingURL=page.getuser.js.map