"use strict";
const md5 = require('blueimp-md5');
const crypto = require('crypto');
class SdkCypt {
    md5(str) {
        return md5.md5(str);
    }
    md5_salt() {
        return crypto.randomBytes(128 / 8).toString('hex');
    }
    salt(password, salt) {
        return md5.md5(password + salt);
    }
}
module.exports = SdkCypt;
//# sourceMappingURL=sdk.crypt.js.map