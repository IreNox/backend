"use strict";
const mongoose = require('mongoose');
var highscoreSchema = new mongoose.Schema({
    points: Number,
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'scorelist' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    time: Date
});
exports.model = mongoose.model('highscore', highscoreSchema);
//# sourceMappingURL=model.highscore.js.map