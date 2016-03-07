import sdk = require("../sdk");
import modelHighscore = require("../models/model.highscore");
import modelScoreList = require("../models/model.scorelist");
import modelUser = require("../models/model.user");
import typesPage = require('../types/types.page');
import typesRest = require('../../shared/types/types.rest');

class HighscorePage implements typesPage.Page {
	run(inputData: typesRest.RestHighscoreRequest, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
		var highscorePage = this;

        if (inputData.action == 'getlists') {
			modelScoreList.model.find({}, function (err, lists: modelScoreList.ScoreList[]) {
				if (sdk.db.checkError(err, callback)) {
					var listList = lists.map(list => highscorePage.exportScoreList(list));
					callback(new typesRest.RestHighscoreGetListsResult(listList));
				}
			});
		}
		else if (inputData.action == 'getlist' && inputData.id && inputData.maxCountOrPoints) {
			modelScoreList.model.findById(inputData.id, function (err, list: modelScoreList.ScoreList) {
				if (sdk.db.checkError(err, callback)) {
					var query = modelHighscore.model.find({ list: inputData.id }).sort({ points: 1 }).limit(inputData.maxCountOrPoints).populate('user');
					query.exec(function (err, highscores: modelHighscore.Highscore[]) {
						if (sdk.db.checkError(err, callback)) {
							var hightscoreList = highscores.map(score => highscorePage.exportHighscore(score));
							callback(new typesRest.RestHighscoreGetListResult(highscorePage.exportScoreList(list), hightscoreList));
						}
					});
				}
			});
		}
		else if (inputData.action == 'send' && inputData.id && inputData.maxCountOrPoints) {
			if (sessionData.user) {				
				modelScoreList.model.findById(inputData.id, function (err, list: modelScoreList.ScoreList) {
					if (sdk.db.checkError(err, callback)) {
						var highscore = new modelHighscore.model();
						highscore.list = list;
						highscore.user = sdk.db.toId(sessionData.user.id);
						highscore.points = inputData.maxCountOrPoints;
						highscore.time = new Date(Date.now());
						highscore.save();

						callback(new typesRest.RestResult(typesRest.RestResultType.Ok));
					}
				});
			}
			else {
				callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.NotLoggedin));
			}
		}
		else {
			callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
		}
	}

	private exportScoreList(list: modelScoreList.ScoreList): typesRest.RestScoreList {
		return { id: list._id.toHexString(), name: list.name };
	}

	private exportHighscore(highscore: modelHighscore.Highscore): typesRest.RestHighscore {
		return { user: sdk.user.exportUser(<modelUser.User>highscore.user), points: highscore.points };
	}
}
export = HighscorePage;