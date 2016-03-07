"use strict";
const typesRest = require('../../shared/types/types.rest');
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
module.exports = LogoutPage;
//# sourceMappingURL=page.logout.js.map