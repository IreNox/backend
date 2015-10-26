import fs = require('fs');
import path = require('path');

export function endsWith(str: string, suffix: string) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

export function includeDirectory(includePath: string): any {
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

//declare module "path" {
//}
