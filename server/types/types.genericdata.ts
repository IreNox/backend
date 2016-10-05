
export enum GenericDataTypeType {
	ValueType,
	Enum,
	Struct
}

export class GenericDataType {
	public name: string;
	public module: string;
	public type: GenericDataTypeType;

	constructor(_name: string, _module: string, _type: GenericDataTypeType) {
		this.name = _name;
		this.module = _module;
		this.type = _type;
	}

	public asEnum(): GenericDataEnum {
		if (this.type !== GenericDataTypeType.Enum) {
			return null;
		}
		var type: any = this;
		return type;
	}

	public asStruct(): GenericDataStruct {
		if (this.type !== GenericDataTypeType.Struct) {
			return null;
		}
		var type: any = this;
		return type;
	}

	public asValueType(): GenericDataValueType {
		if (this.type !== GenericDataTypeType.Enum) {
			return null;
		}
		var type: any = this;
		return type;
	}
}

export enum GenericDataValueTypeType {
	Boolean,

	SingedInteger8,
	SingedInteger16,
	SingedInteger32,
	SingedInteger64,

	UnsingedInteger8,
	UnsingedInteger16,
	UnsingedInteger32,
	UnsingedInteger64,

	FloatingPoint16,
	FloatingPoint32,
	FloatingPoint64,

	String
}

export class GenericDataValueType extends GenericDataType {
	public baseType: GenericDataValueTypeType;

	constructor(_name: string, _module: string, _baseType: GenericDataValueTypeType) {
		super(_name, _module, GenericDataTypeType.ValueType);

		this.baseType = _baseType;
	}
}

export class GenericDataEnumValue {
	public name: string;
	public value: number;
}

export class GenericDataEnum extends GenericDataType {
	public baseType: GenericDataType;
	public values: GenericDataEnumValue[];

	constructor(_name: string, _module: string, _baseType: GenericDataType) {
		super(_name, _module, GenericDataTypeType.Enum);

		this.baseType = _baseType;
		this.values = [];
	}
}

export class GenericDataStructField {
	public name: string;
	public type: GenericDataType;
}

export class GenericDataStruct extends GenericDataType {
	public baseType: GenericDataStruct;
	public fields: GenericDataStructField[];

	constructor(_name: string, _module: string, _baseType: GenericDataStruct) {
		super(_name, _module, GenericDataTypeType.Struct);

		this.baseType = _baseType;
		this.fields = [];
	}
}
