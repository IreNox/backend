"use strict";
var sdk = require("../sdk");
var modelHighscore = require("../models/model.highscore");
var modelScoreList = require("../models/model.scorelist");
var typesRest = require('../../shared/types/types.rest');
var HighscorePage = (function () {
    function HighscorePage() {
    }
    HighscorePage.prototype.run = function (inputData, sessionData, callback) {
        var highscorePage = this;
        if (inputData.action == 'getlists') {
            modelScoreList.model.find({}, function (err, lists) {
                if (sdk.db.checkError(err, callback)) {
                    var listList = lists.map(function (list) { return highscorePage.exportScoreList(list); });
                    callback(new typesRest.RestHighscoreGetListsResult(listList));
                }
            });
        }
        else if (inputData.action == 'getlist' && inputData.id && inputData.maxCountOrPoints) {
            modelScoreList.model.findById(inputData.id, function (err, list) {
                if (sdk.db.checkError(err, callback)) {
                    var query = modelHighscore.model.find({ list: inputData.id }).sort({ points: 1 }).limit(inputData.maxCountOrPoints).populate('user');
                    query.exec(function (err, highscores) {
                        if (sdk.db.checkError(err, callback)) {
                            var hightscoreList = highscores.map(function (score) { return highscorePage.exportHighscore(score); });
                            callback(new typesRest.RestHighscoreGetListResult(highscorePage.exportScoreList(list), hightscoreList));
                        }
                    });
                }
            });
        }
        else if (inputData.action == 'send' && inputData.id && inputData.maxCountOrPoints) {
            if (sessionData.user) {
                modelScoreList.model.findById(inputData.id, function (err, list) {
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
    };
    HighscorePage.prototype.exportScoreList = function (list) {
        return { id: list._id.toHexString(), name: list.name };
    };
    HighscorePage.prototype.exportHighscore = function (highscore) {
        return { user: sdk.user.exportUser(highscore.user), points: highscore.points };
    };
    return HighscorePage;
}());
module.exports = HighscorePage;
//# sourceMappingURL=page.highscore.js.map