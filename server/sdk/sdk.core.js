"use strict";
var SdkCore = (function () {
    function SdkCore() {
    }
    SdkCore.prototype.endsWith = function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };
    ;
    return SdkCore;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkCore;
//# sourceMappingURL=sdk.core.js.map