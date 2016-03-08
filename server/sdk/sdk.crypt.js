"use strict";
var crypto = require('crypto');
var hashAlgo = 'md5';
var hashSize = 128 / 8;
var SdkCypt = (function () {
    function SdkCypt() {
    }
    SdkCypt.prototype.hash = function (str) {
        return crypto.createHmac(hashAlgo, str).digest('hex');
    };
    SdkCypt.prototype.create_salt = function () {
        return crypto.randomBytes(hashSize).toString('hex');
    };
    SdkCypt.prototype.salt = function (password, salt) {
        return this.hash(password + salt);
    };
    return SdkCypt;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkCypt;
//# sourceMappingURL=sdk.crypt.js.map