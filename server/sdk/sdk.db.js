"use strict";
var mongoose = require('mongoose');
var typesRest = require('../types/types.rest');
var SdkDb = (function () {
    function SdkDb() {
    }
    SdkDb.prototype.toId = function (id) {
        return mongoose.Types.ObjectId.createFromHexString(id);
    };
    SdkDb.prototype.checkError = function (err, callback) {
        if (err) {
            console.log('Database error: ' + err);
            callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
            return false;
        }
        return true;
    };
    return SdkDb;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkDb;
//# sourceMappingURL=sdk.db.js.map