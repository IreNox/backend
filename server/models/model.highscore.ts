import mongoose = require('mongoose');
import modelScorelist = require("../models/model.scorelist");
import modelUser = require("../models/model.user");

var highscoreSchema = new mongoose.Schema({
	points: Number,
	list: { type: mongoose.Schema.Types.ObjectId, ref: 'scorelist' },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	time: Date
});

export interface Highscore extends mongoose.Document {
	points: number,
	list: modelScorelist.ScoreList | mongoose.Types.ObjectId,
	user: modelUser.User | mongoose.Types.ObjectId,
	time: Date
}

export var model = mongoose.model<Highscore>('highscore', highscoreSchema);
