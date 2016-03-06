var mongoose = require('mongoose');
var PaymentType;
(function (PaymentType) {
    PaymentType[PaymentType["PayPal"] = 0] = "PayPal";
})(PaymentType || (PaymentType = {}));
var PaymantRewardType;
(function (PaymantRewardType) {
    PaymantRewardType[PaymantRewardType["Gems"] = 0] = "Gems";
})(PaymantRewardType || (PaymantRewardType = {}));
var paymentSchema = new mongoose.Schema({
    type: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user }' },
    value: Number,
    rewardType: String,
    rewardValue: Number
});
exports.model = mongoose.model('payment', paymentSchema);
//# sourceMappingURL=model.payment.js.map