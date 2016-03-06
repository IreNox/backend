import typesRest = require('../../shared/types/types.rest');
import typesPage = require('../types/types.page');

class LogoutPage implements typesPage.Page {
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
export = LogoutPage;