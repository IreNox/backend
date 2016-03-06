import sdk = require("../sdk");
import modelHighscore = require("../models/model.highscore");
import modelUser = require("../models/model.user");
import typesRest = require('../../shared/types/types.rest');
import typesPage = require('../types/types.page');

class HighscorePage implements typesPage.Page {
	run(inputData: typesRest.RestHighscoreRequest, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
		var messagePage = this;

        if (!sessionData.user) {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
		else if (inputData.action == 'getlist') {
			
		}
		else {
			callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
		}
	}
}
export = HighscorePage;