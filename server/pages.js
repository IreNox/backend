var core = require('./core');
var fs = require('fs');
var path = require('path');
var url = require('url');
var Pages = (function () {
    function Pages() {
        this.pages = {};
        var files = fs.readdirSync('./pages');
        for (var index in files) {
            var file = files[index];
            if (!core.endsWith(file, '.js')) {
                continue;
            }
            var fileParts = file.split('.');
            var moduleName = fileParts[1];
            var fileName = './' + path.join('./pages', file);
            var page = require(fileName);
            this.pages[moduleName] = new page();
        }
    }
    Pages.prototype.getRequestHandler = function () {
        var pageManager = this;
        return function (req, res, next) {
            pageManager.runRequest(req, res);
        };
    };
    Pages.prototype.runRequest = function (request, response) {
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
            this.pages[pageName].run(inputData, request.session, function (code, obj) {
                // response.writeHead(code, { 'Content-Type': 'application/json' });
                // response.write(JSON.stringify(obj))
                // response.end();
                response.jsonp(obj);
            });
        }
        else {
            response.writeHead(404, "Not found", { 'Content-Type': 'text/html' });
            response.end(JSON.stringify({ error: "Not found", pageName: pageName }));
        }
    };
    return Pages;
})();
module.exports = Pages;
//# sourceMappingURL=pages.js.map