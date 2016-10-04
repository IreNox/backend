"use strict";
var fs = require("fs");
var libxmljs = require("libxmljs");
var sdk = require("../sdk");
var GenericDataFile = (function () {
    function GenericDataFile() {
    }
    return GenericDataFile;
}());
var SdkGenericData = (function () {
    function SdkGenericData() {
        var queue = [];
        var files = fs.readdirSync("./data/genericdata");
        files.forEach(function (file) {
            if (!sdk.core.endsWith(file, ".tikigenerictypes")) {
                return;
            }
            var filename = sdk.core.getFilename(file);
            var fileContent = fs.readFileSync("./data/genericdata/" + file, "utf8");
            var xmlDoc = libxmljs.parseXml(fileContent);
            queue.push({ filename: filename, document: xmlDoc });
        });
        queue = queue.sort(function (a, b) {
            var baseAttrA = a.document.root().attr("base");
            var baseAttrB = a.document.root().attr("base");
            if (baseAttrA == null && baseAttrB == null) {
                return 0;
            }
            if (baseAttrA != null && baseAttrA.value() == b.filename) {
                return 1;
            }
            if (baseAttrB != null && baseAttrB.value() == a.filename) {
                return -1;
            }
            return 0;
        });
        for (var index in queue) {
            var file = queue[index];
            this.addTypes(file);
        }
    }
    SdkGenericData.prototype.addTypes = function (file) {
        var xmlDoc = file.document;
        var typeNodes = xmlDoc.root().childNodes();
        for (var typeIndex in typeNodes) {
            var typeNode = typeNodes[typeIndex];
            var typeNodeType = typeNode.name().toLowerCase();
            if (typeNodeType == "enum") {
                var valueNodes = typeNode.childNodes();
            }
            else if (typeNodeType == "struct") {
            }
            else {
                throw "Invalid GenericData type";
            }
        }
    };
    return SdkGenericData;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkGenericData;
//# sourceMappingURL=sdk.genericdata.js.map