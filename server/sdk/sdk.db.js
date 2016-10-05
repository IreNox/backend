"use strict";
const mongoose = require('mongoose');
const typesRest = require('../types/types.rest');
class SdkDb {
    toId(id) {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }
    checkError(err, callback) {
        if (err) {
            console.log('Database error: ' + err);
            callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
            return false;
        }
        return true;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkDb;
//# sourceMappingURL=sdk.db.js.map