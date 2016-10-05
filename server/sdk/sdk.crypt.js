"use strict";
const crypto = require('crypto');
const hashAlgo = 'md5';
const hashSize = 128 / 8;
class SdkCypt {
    hash(str) {
        return crypto.createHmac(hashAlgo, str).digest('hex');
    }
    create_salt() {
        return crypto.randomBytes(hashSize).toString('hex');
    }
    salt(password, salt) {
        return this.hash(password + salt);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkCypt;
//# sourceMappingURL=sdk.crypt.js.map