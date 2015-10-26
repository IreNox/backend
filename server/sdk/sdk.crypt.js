var md5 = require('md5');
var crypto = require('crypto');
var SdkCypt = (function () {
    function SdkCypt() {
    }
    SdkCypt.prototype.md5 = function (str) {
        return md5(str);
    };
    SdkCypt.prototype.md5_salt = function () {
        return crypto.randomBytes(128 / 8).toString('hex');
    };
    SdkCypt.prototype.salt = function (password, salt) {
        return md5(password + salt);
    };
    return SdkCypt;
})();
module.exports = SdkCypt;
//module.exports = {
//    md5: function (str) {
//        return md5(str);
//    },
//    md5_salt: function () {
//        return crypto.randomBytes(128 / 8).toString('hex');
//    },
//    salt: function (password, salt) {
//        return md5(password + salt)
//    }
//}; 
//# sourceMappingURL=sdk.crypt.js.map