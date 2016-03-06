var mongoose = require('mongoose');
var SdkDb = (function () {
    function SdkDb() {
    }
    SdkDb.prototype.toId = function (id) {
        return mongoose.Types.ObjectId.createFromHexString(id);
    };
    return SdkDb;
})();
module.exports = SdkDb;
//# sourceMappingURL=sdk.db.js.map