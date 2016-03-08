import * as mongoose from 'mongoose';
import * as modelScorelist from "../models/model.scorelist";
import * as modelUser from '../models/model.user';

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
