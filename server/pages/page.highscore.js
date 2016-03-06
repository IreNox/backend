var typesRest = require('../../shared/types/types.rest');
var HighscorePage = (function () {
    function HighscorePage() {
    }
    HighscorePage.prototype.run = function (inputData, sessionData, callback) {
        var messagePage = this;
        if (!sessionData.user) {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.action == 'getlist') {
        }
        else {
            callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
        }
    };
    return HighscorePage;
})();
module.exports = HighscorePage;
//# sourceMappingURL=page.highscore.js.map