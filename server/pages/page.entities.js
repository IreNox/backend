"use strict";
var typesRest = require('../types/types.rest');
var EntitiesPage = (function () {
    function EntitiesPage() {
    }
    EntitiesPage.prototype.run = function (inputData, sessionData, callback) {
        callback(new typesRest.RestResult(typesRest.RestResultType.NotFound));
    };
    return EntitiesPage;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EntitiesPage;
//# sourceMappingURL=page.entities.js.map