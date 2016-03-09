// Type definitions for mime
// Project: https://github.com/broofa/node-mime
// Definitions by: Jeff Goddard <https://github.com/jedigo>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Imported from: https://github.com/soywiz/typescript-node-definitions/mime.d.ts

declare module "mime" {
	function lookup(path: string): string;
	function extension(mime: string): string;
	function load(filepath: string): void;
	function define(mimes: Object): void;

	interface Charsets {
		lookup(mime: string): string;
	}

	var charsets: Charsets;
}
