"use strict";
var SdkCrypt = require('./sdk/sdk.crypt');
var SdkDb = require('./sdk/sdk.db');
var SdkUser = require('./sdk/sdk.user');
exports.crypt = new SdkCrypt();
exports.db = new SdkDb();
exports.user = new SdkUser();
//# sourceMappingURL=sdk.js.map