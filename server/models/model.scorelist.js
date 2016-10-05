"use strict";
const mongoose = require('mongoose');
var scorelistSchema = new mongoose.Schema({
    name: String
});
exports.model = mongoose.model('scorelist', scorelistSchema);
//# sourceMappingURL=model.scorelist.js.map