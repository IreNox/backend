"use strict";
const SdkCrypt = require('./sdk/sdk.crypt');
const SdkDb = require('./sdk/sdk.db');
const SdkUser = require('./sdk/sdk.user');
exports.crypt = new SdkCrypt();
exports.db = new SdkDb();
exports.user = new SdkUser();
//# sourceMappingURL=sdk.js.map