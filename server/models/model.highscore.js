var mongoose = require('mongoose');
var highscoreSchema = new mongoose.Schema({
    points: Number,
    list_id: { type: mongoose.Schema.Types.ObjectId, ref: 'scorelist' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    time: Date
});
exports.model = mongoose.model('highscore', highscoreSchema);
//# sourceMappingURL=model.highscore.js.map