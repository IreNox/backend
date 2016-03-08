"use strict";
var mongoose = require('mongoose');
var messageSchema = new mongoose.Schema({
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    subject: String,
    message: String,
    read: Boolean,
    sent_time: Date
});
exports.model = mongoose.model('message', messageSchema);
//# sourceMappingURL=model.message.js.map