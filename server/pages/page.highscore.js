"use strict";
var sdk = require('../sdk');
var modelHighscore = require('../models/model.highscore');
var modelScoreList = require('../models/model.scorelist');
var typesRest = require('../types/types.rest');
var HighscorePage = (function () {
    function HighscorePage() {
    }
    HighscorePage.prototype.run = function (inputData, sessionData, callback) {
        var highscorePage = this;
        if (inputData.action == typesRest.RestHighscoreActions.GetLists) {
            modelScoreList.model.find({}, function (err, lists) {
                if (sdk.db.checkError(err, callback)) {
                    var listList = lists.map(function (list) { return highscorePage.exportScoreList(list); });
                    callback(new typesRest.RestHighscoreGetListsResult(listList));
                }
            });
        }
        else if (inputData.action == typesRest.RestHighscoreActions.GetList && inputData.list_name && inputData.maxCountOrPoints) {
            modelScoreList.model.findOne({ name: inputData.list_name }, function (err, list) {
                if (sdk.db.checkError(err, callback)) {
                    var query = modelHighscore.model.find({ list: list.id }).sort({ points: 1 }).limit(inputData.maxCountOrPoints).populate('user');
                    query.exec(function (err, highscores) {
                        if (sdk.db.checkError(err, callback)) {
                            var hightscoreList = highscores.map(function (score) { return highscorePage.exportHighscore(score); });
                            callback(new typesRest.RestHighscoreGetListResult(highscorePage.exportScoreList(list), hightscoreList));
                        }
                    });
                }
            });
        }
        else if (inputData.action == typesRest.RestHighscoreActions.Send && inputData.list_name && inputData.maxCountOrPoints) {
            if (sessionData.user) {
                modelScoreList.model.findOne({ name: inputData.list_name }, function (err, list) {
                    var saveHighscoreFunc = function (err, list) {
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
    };
    HighscorePage.prototype.exportScoreList = function (list) {
        return { id: list.id, name: list.name };
    };
    HighscorePage.prototype.exportHighscore = function (highscore) {
        return { user: sdk.user.exportUser(highscore.user), points: highscore.points };
    };
    return HighscorePage;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HighscorePage;
//# sourceMappingURL=page.highscore.js.map