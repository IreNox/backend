"use strict";
var fs = require('fs');
var path = require('path');
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
exports.endsWith = endsWith;
;
function includeDirectory(includePath) {
    var files = fs.readdirSync(includePath);
    var result = {};
    for (var index in files) {
        var file = files[index];
        if (!endsWith(file, '.js')) {
            continue;
        }
        var fileParts = file.split('.');
        var moduleName = fileParts[1];
        var fileName = './' + path.join(includePath, file);
        result[moduleName] = require(fileName);
    }
    return result;
}
exports.includeDirectory = includeDirectory;
//declare module "path" {
//}
//# sourceMappingURL=core.js.map