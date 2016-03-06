var mongoose = require('mongoose');
var PaymentType;
(function (PaymentType) {
    PaymentType[PaymentType["PayPal"] = 0] = "PayPal";
})(PaymentType || (PaymentType = {}));
var PaymantRewardType;
(function (PaymantRewardType) {
    PaymantRewardType[PaymantRewardType["Points"] = 0] = "Points";
})(PaymantRewardType || (PaymantRewardType = {}));
var paymentSchema = new mongoose.Schema({
    type: PaymentType,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user }' },
    value: Number,
    rewardType: PaymantRewardType,
    rewardValue: Number
});
exports.model = mongoose.model('user', paymentSchema);
//# sourceMappingURL=model.payment.js.map