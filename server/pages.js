"use strict";
const fs = require('fs');
const path = require('path');
const url = require('url');
const sdk = require('./sdk');
class Pages {
    constructor() {
        this.pages = {};
        var files = fs.readdirSync('./pages');
        for (var index in files) {
            var file = files[index];
            if (!sdk.core.endsWith(file, '.js')) {
                continue;
            }
            var fileParts = file.split('.');
            var moduleName = fileParts[1];
            var fileName = './' + path.join('./pages', file);
            var page = require(fileName).default;
            this.pages[moduleName] = new page();
        }
    }
    getRequestHandler() {
        var pageManager = this;
        return function (req, res, next) {
            pageManager.runRequest(req, res);
        };
    }
    runRequest(request, response) {
        var pageName = url.parse(request.url).pathname.substring(1);
        if (pageName in this.pages) {
            var inputData = {};
            if (request.method == 'POST') {
                for (var key in request.body) {
                    inputData[key] = request.body[key];
                }
            }
            for (var key in request.query) {
                inputData[key] = request.query[key];
            }
            if (!request.session["data"]) {
                request.session["data"] = {};
            }
            var sessionData = request.session["data"];
            this.pages[pageName].run(inputData, sessionData, function (obj) {
                response.json(obj);
            });
        }
        else {
            response.writeHead(404, "Not found", { 'Content-Type': 'text/html' });
            response.end(JSON.stringify({ error: "Not found", pageName: pageName }));
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pages;
//# sourceMappingURL=pages.js.map