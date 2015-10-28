var typesRest = require('../types/types.rest');
var LogoutPage = (function () {
    function LogoutPage() {
    }
    LogoutPage.prototype.run = function (inputData, sessionData, callback) {
        if (sessionData.user) {
            sessionData.user = null;
            callback(200, new typesRest.RestResult(typesRest.RestResultType.Ok));
        }
        else {
            callback(200, new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
    };
    return LogoutPage;
})();
module.exports = LogoutPage;
//# sourceMappingURL=page.logout.js.map