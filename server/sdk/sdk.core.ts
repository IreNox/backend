
export default class SdkCore {
	getFilenameWithExtension(path: string): string {
		var lastSlash: number = path.lastIndexOf("/");
		if (lastSlash == -1) {
			return path;
		}

		return path.substring(lastSlash + 1);
	}

	getFilename(path: string): string {
		var filename: string = this.getFilenameWithExtension(path);
		var lastDot = filename.lastIndexOf(".");
		if (lastDot == -1) {
			return filename;
		}

		return filename.substr(0, lastDot);
	}

	endsWith(str: string, suffix: string): boolean {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
}
