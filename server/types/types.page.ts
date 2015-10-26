import rest = require('./types.rest');

export interface RestCallback {
    (code: number, data: rest.RestResult): void;
}

export interface Page {
    run(inputData: any, sessionData: any, callback: RestCallback): void;
}