import * as sdk from '../sdk';
import * as modelHighscore from '../models/model.highscore';
import * as modelScoreList from '../models/model.scorelist';
import * as modelUser from '../models/model.user';
import * as typesPage from '../types/types.page';
import * as typesRest from '../../shared/types/types.rest';

export default class HighscorePage implements typesPage.Page {
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
		else if (inputData.action == 'getlist' && inputData.list_name && inputData.maxCountOrPoints) {
			modelScoreList.model.findOne({ name: inputData.list_name }, function(err, list: modelScoreList.ScoreList) {
				if (sdk.db.checkError(err, callback)) {
					var query = modelHighscore.model.find({ list: list.id }).sort({ points: 1 }).limit(inputData.maxCountOrPoints).populate('user');
					query.exec(function (err, highscores: modelHighscore.Highscore[]) {
						if (sdk.db.checkError(err, callback)) {
							var hightscoreList = highscores.map(score => highscorePage.exportHighscore(score));
							callback(new typesRest.RestHighscoreGetListResult(highscorePage.exportScoreList(list), hightscoreList));
						}
					});
				}
			});
		}
		else if (inputData.action == 'send' && inputData.list_name && inputData.maxCountOrPoints) {
			if (sessionData.user) {
				modelScoreList.model.findOne({ name: inputData.list_name }, function (err, list: modelScoreList.ScoreList) {
					var saveHighscoreFunc = function (err, list: modelScoreList.ScoreList) {
						if (sdk.db.checkError(err, callback)) {
							var highscore = new modelHighscore.model();
							highscore.list = list;
							highscore.user = sdk.db.toId(sessionData.user.id);
							highscore.points = inputData.maxCountOrPoints;
							highscore.time = new Date(Date.now());
							highscore.save();

							callback(new typesRest.RestResult(typesRest.RestResultType.Ok));
						}
					};

					if (err || list == null) {
						list = new modelScoreList.model();
						list.name = inputData.list_name;
						list.save(saveHighscoreFunc);
					}
					else {
						saveHighscoreFunc(null, list);
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
		return { id: list.id, name: list.name };
	}

	private exportHighscore(highscore: modelHighscore.Highscore): typesRest.RestHighscore {
		return { user: sdk.user.exportUser(<modelUser.User>highscore.user), points: highscore.points };
	}
}
