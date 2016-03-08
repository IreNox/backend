import * as typesRest from '../types/types.rest';
import * as typesPage from '../types/types.page';

export default class LogoutPage implements typesPage.Page {
    run(inputData: any, sessionData: any, callback: typesPage.RestCallback): void {
		if (sessionData.user) {
			sessionData.user = null;
			callback(new typesRest.RestResult(typesRest.RestResultType.Ok));
		}
		else {
			callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
		}		
	}
}
