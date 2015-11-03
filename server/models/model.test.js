var mongoose = require('mongoose');
var testSchema = new mongoose.Schema({
    name: String
});
exports.model = mongoose.model('test', testSchema);
//# sourceMappingURL=model.test.js.map