import core = require('./core');
import fs = require('fs');
import path = require('path');
import typesPage = require('./types/types.page');
import url = require('url');
import http = require('http');

interface ExpressRequest extends http.ServerRequest {
    body: any;
    query: any;
    session: any;
}

class Pages {
    private pages: { [s: string]: typesPage.Page; } = {};

    constructor() {
        var files: string[] = fs.readdirSync('./pages');

        for (var index in files) {
            var file: string = files[index];
            if (!core.endsWith(file, '.js')) {
                continue;
            }

            var fileParts: string[] = file.split('.');
            var moduleName: string = fileParts[1];
            var fileName: string = './' + path.join('./pages', file);

            this.pages[moduleName] = require(fileName);
        }
    }

    runRequest(request: ExpressRequest, response: http.ServerResponse): void {
        var pageName = url.parse(request.url).pathname.substring(1);
        if (pageName in this.pages) {
            var inputData: any = {};
            if (request.method == 'POST') {
                for (var key in request.body) {
                    inputData[key] = request.body[key];
                }
            }

            for (var key in request.query) {
                inputData[key] = request.query[key];
            }

            this.pages[pageName].run(inputData, request.session, function (code, obj) {
                response.writeHead(code, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(obj))
                response.end();
            });
        }
        else {
            response.writeHead(404, "Not found", { 'Content-Type': 'text/html' });
            response.end(JSON.stringify({ error: "Not found", pageName: pageName }));
        }
    }
}
export = Pages;
