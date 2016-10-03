import * as fs from 'fs';
import * as sdk from '../sdk';
import * as typesGenericData from '../types/types.genericdata';

export default class SdkGenericData {
	private types: typesGenericData.GenericDataType;

	constructor() {
		var files: string[] = fs.readdirSync('./pages');
		files.forEach(function (file: string) {
			if (!sdk.core.endsWith(file, '.tikigenerictypes')) {
				return;
			}

			var fileContent: string = fs.readFileSync(file, 'utf8');
			
		});
	}

	private addTypes(): void {

	}
}