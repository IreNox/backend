import sdk = require("../sdk");
import modelPayment = require("../models/model.payment");
import typesRest = require('../../shared/types/types.rest');
import typesPage = require('../types/types.page');

class PaymentPage implements typesPage.Page {
    run(inputData: any, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
        if (!inputData.action) {
            callback(new typesRest.RestFindUserResult(typesRest.RestResultType.InvalidCall));
        }
        else if (!sessionData.user) {
            callback(new typesRest.RestFindUserResult(typesRest.RestResultType.NotLoggedin));
        }
        else {
			if (inputData.action == 'get') {
				modelPayment.model.find({ user_id: sessionData.user.id }, function (err, data: modelPayment.Payment[]) {
					if (err) {
						callback(new typesRest.RestFindUserResult(typesRest.RestResultType.DatabaseError));
					}
					else {
					}
				});
			}
     //       var regex = new RegExp(inputData.username, "i");
     //       modelUser.model.find({ username: regex }, function (err, result: modelUser.User[]) {
     //           if (err || !result) {
					//callback(new typesRest.RestFindUserResult(typesRest.RestResultType.NotFound));
     //           }
     //           else {
					//var userId: string = sessionData.user.id;
					//callback(
					//	new typesRest.RestFindUserResult(
					//		typesRest.RestResultType.Ok,
					//		result.filter(value => value._id.toHexString() != userId).map(value => sdk.user.exportUser(value))
					//	)
					//);
     //           }
     //       });
        }
    }
}
export = PaymentPage;