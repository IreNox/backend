import mongoose = require('mongoose');

enum PaymentType {
	PayPal
}

enum PaymantRewardType {
	Gems
}

var paymentSchema = new mongoose.Schema({
    type: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user }' },
	value: Number,
	rewardType: String,
	rewardValue: Number
});

export interface Payment extends mongoose.Document {
    type: PaymentType,
    user_id: mongoose.Types.ObjectId,
	value: Number,
	rewardType: PaymantRewardType,
	rewardValue: Number
}

export var model = mongoose.model<Payment>('payment', paymentSchema);
