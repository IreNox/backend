"use strict";
const modelPayment = require('../models/model.payment');
const typesRest = require('../types/types.rest');
class PaymentPage {
    run(inputData, sessionData, callback) {
        if (!inputData.action) {
            callback(new typesRest.RestFindUserResult(typesRest.RestResultType.InvalidCall));
        }
        else if (!sessionData.user) {
            callback(new typesRest.RestFindUserResult(typesRest.RestResultType.NotLoggedin));
        }
        else {
            if (inputData.action == 'get') {
                modelPayment.model.find({ user_id: sessionData.user.id }, function (err, data) {
                    if (err) {
                        callback(new typesRest.RestFindUserResult(typesRest.RestResultType.DatabaseError));
                    }
                    else {
                    }
                });
            }
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaymentPage;
//# sourceMappingURL=page.payment.js.map