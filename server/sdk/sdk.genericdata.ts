import * as fs from "fs";
import * as libxmljs from "libxmljs";
import * as sdk from "../sdk";
import * as gd from "../types/types.genericdata";

class GenericDataFile {
	public filename: string;
	public document: libxmljs.XMLDocument;
}

export default class SdkGenericData {
	private types: gd.GenericDataType[];

	constructor() {
		this.addValueType("bool", gd.GenericDataValueTypeType.Boolean);

		this.addValueType("sint8", gd.GenericDataValueTypeType.SingedInteger8);
		this.addValueType("sint16", gd.GenericDataValueTypeType.SingedInteger16);
		this.addValueType("sint32", gd.GenericDataValueTypeType.SingedInteger32);
		this.addValueType("sint64", gd.GenericDataValueTypeType.SingedInteger64);

		this.addValueType("uint8", gd.GenericDataValueTypeType.UnsingedInteger8);
		this.addValueType("uint16", gd.GenericDataValueTypeType.UnsingedInteger16);
		this.addValueType("uint32", gd.GenericDataValueTypeType.UnsingedInteger32);
		this.addValueType("uint64", gd.GenericDataValueTypeType.UnsingedInteger64);

		this.addValueType("half", gd.GenericDataValueTypeType.FloatingPoint16);
		this.addValueType("float", gd.GenericDataValueTypeType.FloatingPoint32);
		this.addValueType("double", gd.GenericDataValueTypeType.FloatingPoint64);

		this.addValueType("string", gd.GenericDataValueTypeType.String);

		let queue: GenericDataFile[] = [];
		let files: string[] = fs.readdirSync("./data/genericdata");
		files.forEach(function (file: string): void {
			if (!sdk.core.endsWith(file, ".tikigenerictypes")) {
				return;
			}

			let filename: string = sdk.core.getFilename(file);
			let fileContent: string = fs.readFileSync("./data/genericdata/" + file, "utf8");
			let xmlDoc: libxmljs.XMLDocument = libxmljs.parseXml(fileContent);

			queue.push({ filename: filename, document: xmlDoc });
		});

		queue = queue.sort(function (a: GenericDataFile, b: GenericDataFile): number {
			let baseAttrA = a.document.root().attr("base");
			let baseAttrB = a.document.root().attr("base");
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
			let file: GenericDataFile = queue[index];
			this.addTypes(file);
		}		
	}

	public findTypeByName(name: string): gd.GenericDataType {
		return this.types.find(type => type.name == name);
	}

	public findTypeByNameAndType(name: string, type: gd.GenericDataTypeType): gd.GenericDataType {
		return this.types.find(t => t.name == name && t.type == type);
	}

	public findEnumByName(name: string): gd.GenericDataEnum {
		return this.findTypeByNameAndType(name, gd.GenericDataTypeType.Enum).asEnum();
	}

	public findStructByName(name: string): gd.GenericDataStruct {
		return this.findTypeByNameAndType(name, gd.GenericDataTypeType.Struct).asStruct();
	}

	public findValueTypeByName(name: string): gd.GenericDataValueType {
		return this.findTypeByNameAndType(name, gd.GenericDataTypeType.ValueType).asValueType();
	}

	private addTypes(file: GenericDataFile): void {
		let xmlDoc: libxmljs.XMLDocument = file.document;
		let enumDefaultBaseType: gd.GenericDataValueType = this.findValueTypeByName("sint32");

		let typeNodes: libxmljs.Element[] = xmlDoc.root().childNodes();
		for (var typeIndex in typeNodes) {
			let typeNode: libxmljs.Element = typeNodes[typeIndex];
			let typeNodeType = typeNode.name().toLowerCase();

			let typeNameAttr = typeNode.attr("name");
			if (typeNameAttr == null) {
				console.log("Type has no name attribute");
				continue;
			}
			let typeName = typeNameAttr.value();

			var typeBaseType: gd.GenericDataType = null;
			let typeBaseTypeAttr = typeNode.attr("base");
			if (typeBaseTypeAttr != null)
			{
				typeBaseType = this.findTypeByName(typeBaseTypeAttr.value());
			}

			var type: gd.GenericDataType = null;
			if (typeNodeType == "enum") {
				let enumBaseType: gd.GenericDataValueType = typeBaseType.asValueType() || enumDefaultBaseType;

				let enumType: gd.GenericDataEnum = new gd.GenericDataEnum(typeName, file.filename, enumBaseType);

				var currentValue: number = 0;
				let valueNodes: libxmljs.Element[] = typeNode.childNodes();
				for (var valueIndex in valueNodes) {
					let valueNode: libxmljs.Element = valueNodes[valueIndex];

					let valueNameAttr = valueNode.attr("name");
					if (valueNameAttr == null) {
						console.log("Enum value has no name attribute in " + typeName);
						continue;
					}

					let valueValueAttr = valueNode.attr("value");
					if (valueValueAttr != null) {
						currentValue = Number(valueValueAttr.value());
					}

					let value: gd.GenericDataEnumValue = new gd.GenericDataEnumValue();
					value.name = valueNameAttr.value();
					value.value = currentValue;
					enumType.values.push(value);

					currentValue++;
				}

				type = enumType;
			}
			else if (typeNodeType == "struct") {
			}
			else {
				console.log("Invalid GenericData type: " + typeNodeType);
			}
		}
	}

	private addValueType(name: string, baseType: gd.GenericDataValueTypeType): void {
		let valueType = new gd.GenericDataValueType(name, "base", baseType);
		this.types.push(valueType);
	}
}