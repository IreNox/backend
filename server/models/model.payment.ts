import mongoose = require('mongoose');

enum PaymentType {
	PayPal
}

enum PaymantRewardType {
	Points
}

var paymentSchema = new mongoose.Schema({
    type: PaymentType,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user }' },
	value: Number,
	rewardType: PaymantRewardType,
	rewardValue: Number
});

export interface Payment extends mongoose.Document {
    type: PaymentType,
    user_id: mongoose.Types.ObjectId,
	value: Number,
	rewardType: PaymantRewardType,
	rewardValue: Number
}

export var model = mongoose.model('user', paymentSchema);
