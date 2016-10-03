import * as fs from "fs";
import * as libxmljs from "libxmljs";
import * as sdk from "../sdk";
import * as typesGenericData from "../types/types.genericdata";

class GenericDataFile {
	public filename: string;
	public document: libxmljs.XMLDocument;
}

export default class SdkGenericData {
	private types: typesGenericData.GenericDataType;

	constructor() {
		var queue: GenericDataFile[] = [];

		var files: string[] = fs.readdirSync("./data/genericdata");
		files.forEach(function (file: string): void {
			if (!sdk.core.endsWith(file, ".tikigenerictypes")) {
				return;
			}

			var filename: string = sdk.core.getFilename(file);
			var fileContent: string = fs.readFileSync("./data/genericdata/" + file, "utf8");
			var xmlDoc: libxmljs.XMLDocument = libxmljs.parseXml(fileContent);

			queue.push({ filename: filename, document: xmlDoc });
		});

		queue = queue.sort(function (a: GenericDataFile, b: GenericDataFile): number {
			var baseAttrA = a.document.root().attr("base");
			var baseAttrB = a.document.root().attr("base");
			if (baseAttrA == null && baseAttrB == null) {
				return 0;
			}

			if (baseAttrA != null && baseAttrA.value() == b.filename) {
				return 1;
			}

			if (baseAttrB != null && baseAttrB.value() == a.filename) {
				return -1;
			}

			return 0;
		});

		for (var index in queue) {
			var file: GenericDataFile = queue[index];
			this.addTypes(file);
		}		
	}

	private addTypes(file: GenericDataFile): void {
		var xmlDoc: libxmljs.XMLDocument = file.document;

		xmlDoc.root().childNodes()
	}
}