import mongoose = require('mongoose');

var scorelistSchema = new mongoose.Schema({
	name: String
});

export interface ScoreList extends mongoose.Document {
	name: string
}

export var model = mongoose.model<ScoreList>('scorelist', scorelistSchema);
