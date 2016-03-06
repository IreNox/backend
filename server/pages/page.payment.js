var typesRest = require('../../shared/types/types.rest');
var PaymentPage = (function () {
    function PaymentPage() {
    }
    PaymentPage.prototype.run = function (inputData, sessionData, callback) {
        if (!inputData.username) {
            callback(new typesRest.RestFindUserResult(typesRest.RestResultType.InvalidCall));
        }
        else if (!sessionData.user) {
            callback(new typesRest.RestFindUserResult(typesRest.RestResultType.NotLoggedin));
        }
        else {
        }
    };
    return PaymentPage;
})();
module.exports = PaymentPage;
//# sourceMappingURL=page.payment.js.map