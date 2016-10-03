"use strict";
var fs = require('fs');
var sdk = require('../sdk');
var SdkGenericData = (function () {
    function SdkGenericData() {
        var files = fs.readdirSync('./pages');
        files.forEach(function (file) {
            if (!sdk.core.endsWith(file, '.tikigenerictypes')) {
                return;
            }
            var fileContent = fs.readFileSync(file, 'utf8');
        });
    }
    SdkGenericData.prototype.addTypes = function () {
    };
    return SdkGenericData;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkGenericData;
//# sourceMappingURL=sdk.genericdata.js.map