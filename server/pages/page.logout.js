"use strict";
const typesRest = require('../types/types.rest');
class LogoutPage {
    run(inputData, sessionData, callback) {
        if (sessionData.user) {
            sessionData.user = null;
            callback(new typesRest.RestResult(typesRest.RestResultType.Ok));
        }
        else {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LogoutPage;
//# sourceMappingURL=page.logout.js.map