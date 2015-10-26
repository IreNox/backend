// Type definitions for md5 v1.1.0
// Project: http://travis-ci.org/pvorb/node-md5
// Definitions by: Tim Boden <https://github.com/irenox>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'md5' {
    interface Md5Options {
        asBytes?: boolean;
        asString?: boolean;
        encoding?: string;
    }

    function md5_func(message: string, options?: Md5Options): string;

    export = md5_func;
}