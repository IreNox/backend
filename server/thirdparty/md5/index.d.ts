// Type definitions for md5 v1.1.0
// Project: http://travis-ci.org/pvorb/node-md5
// Definitions by: Tim Boden <https://github.com/irenox>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'md5' {
    function md5_func(message: string, options?: md5.Md5Options): string;

	module md5 {
		export interface Md5Options {
			asBytes?: boolean;
			asString?: boolean;
			encoding?: string;
		}
	}

	export = md5_func;
}