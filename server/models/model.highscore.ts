import mongoose = require('mongoose');

var highscoreSchema = new mongoose.Schema({
	points: Number,
	list_id: { type: mongoose.Schema.Types.ObjectId, ref: 'scorelist' },
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	time: Date
});

export interface Highscore extends mongoose.Document {
	points: Number,
	list_id: mongoose.Types.ObjectId,
	user_id: mongoose.Types.ObjectId,
	time: Date
}

export var model = mongoose.model('highscore', highscoreSchema);
