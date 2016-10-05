"use strict";
const typesRest = require('../types/types.rest');
class EntitiesPage {
    constructor() {
    }
    run(inputData, sessionData, callback) {
        callback(new typesRest.RestResult(typesRest.RestResultType.NotFound));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EntitiesPage;
//# sourceMappingURL=page.entities.js.map