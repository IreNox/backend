"use strict";
class SdkCore {
    getFilenameWithExtension(path) {
        var lastSlash = path.lastIndexOf("/");
        if (lastSlash == -1) {
            return path;
        }
        return path.substring(lastSlash + 1);
    }
    getFilename(path) {
        var filename = this.getFilenameWithExtension(path);
        var lastDot = filename.lastIndexOf(".");
        if (lastDot == -1) {
            return filename;
        }
        return filename.substr(0, lastDot);
    }
    endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkCore;
//# sourceMappingURL=sdk.core.js.map