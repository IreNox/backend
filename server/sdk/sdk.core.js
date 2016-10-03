"use strict";
var SdkCore = (function () {
    function SdkCore() {
    }
    SdkCore.prototype.getFilenameWithExtension = function (path) {
        var lastSlash = path.lastIndexOf("/");
        if (lastSlash == -1) {
            return path;
        }
        return path.substring(lastSlash + 1);
    };
    SdkCore.prototype.getFilename = function (path) {
        var filename = this.getFilenameWithExtension(path);
        var lastDot = filename.lastIndexOf(".");
        if (lastDot == -1) {
            return filename;
        }
        return filename.substr(0, lastDot);
    };
    SdkCore.prototype.endsWith = function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };
    return SdkCore;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkCore;
//# sourceMappingURL=sdk.core.js.map