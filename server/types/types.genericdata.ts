
export enum GenericDataTypeType {
	ValueType,
	Enum,
	Struct
}

export class GenericDataType {
	public name: string;
	public module: string;
	public type: GenericDataTypeType;
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
}

export class GenericDataEnumValue {
	public name: string;
	public value: number;
}

export class GenericDataEnum extends GenericDataType {
	public baseType: GenericDataType;
	public values: GenericDataEnumValue[];
}

export class GenericDataStructField {
	public name: string;
	public type: GenericDataType;
}

export class GenericDataStruct extends GenericDataType {
	public baseType: GenericDataType;
	public fields: GenericDataStructField[];
}
