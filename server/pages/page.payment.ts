import * as sdk from '../sdk';
import * as modelPayment from '../models/model.payment';
import * as typesRest from '../types/types.rest';
import * as typesPage from '../types/types.page';

export default class PaymentPage implements typesPage.Page {
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
        }
    }
}
