"use strict";
(function (GenericDataTypeType) {
    GenericDataTypeType[GenericDataTypeType["ValueType"] = 0] = "ValueType";
    GenericDataTypeType[GenericDataTypeType["Enum"] = 1] = "Enum";
    GenericDataTypeType[GenericDataTypeType["Struct"] = 2] = "Struct";
})(exports.GenericDataTypeType || (exports.GenericDataTypeType = {}));
var GenericDataTypeType = exports.GenericDataTypeType;
class GenericDataType {
    constructor(_name, _module, _type) {
        this.name = _name;
        this.module = _module;
        this.type = _type;
    }
    asEnum() {
        if (this.type !== GenericDataTypeType.Enum) {
            return null;
        }
        var type = this;
        return type;
    }
    asStruct() {
        if (this.type !== GenericDataTypeType.Struct) {
            return null;
        }
        var type = this;
        return type;
    }
    asValueType() {
        if (this.type !== GenericDataTypeType.Enum) {
            return null;
        }
        var type = this;
        return type;
    }
}
exports.GenericDataType = GenericDataType;
(function (GenericDataValueTypeType) {
    GenericDataValueTypeType[GenericDataValueTypeType["Boolean"] = 0] = "Boolean";
    GenericDataValueTypeType[GenericDataValueTypeType["SingedInteger8"] = 1] = "SingedInteger8";
    GenericDataValueTypeType[GenericDataValueTypeType["SingedInteger16"] = 2] = "SingedInteger16";
    GenericDataValueTypeType[GenericDataValueTypeType["SingedInteger32"] = 3] = "SingedInteger32";
    GenericDataValueTypeType[GenericDataValueTypeType["SingedInteger64"] = 4] = "SingedInteger64";
    GenericDataValueTypeType[GenericDataValueTypeType["UnsingedInteger8"] = 5] = "UnsingedInteger8";
    GenericDataValueTypeType[GenericDataValueTypeType["UnsingedInteger16"] = 6] = "UnsingedInteger16";
    GenericDataValueTypeType[GenericDataValueTypeType["UnsingedInteger32"] = 7] = "UnsingedInteger32";
    GenericDataValueTypeType[GenericDataValueTypeType["UnsingedInteger64"] = 8] = "UnsingedInteger64";
    GenericDataValueTypeType[GenericDataValueTypeType["FloatingPoint16"] = 9] = "FloatingPoint16";
    GenericDataValueTypeType[GenericDataValueTypeType["FloatingPoint32"] = 10] = "FloatingPoint32";
    GenericDataValueTypeType[GenericDataValueTypeType["FloatingPoint64"] = 11] = "FloatingPoint64";
    GenericDataValueTypeType[GenericDataValueTypeType["String"] = 12] = "String";
})(exports.GenericDataValueTypeType || (exports.GenericDataValueTypeType = {}));
var GenericDataValueTypeType = exports.GenericDataValueTypeType;
class GenericDataValueType extends GenericDataType {
    constructor(_name, _module, _baseType) {
        super(_name, _module, GenericDataTypeType.ValueType);
        this.baseType = _baseType;
    }
}
exports.GenericDataValueType = GenericDataValueType;
class GenericDataEnumValue {
}
exports.GenericDataEnumValue = GenericDataEnumValue;
class GenericDataEnum extends GenericDataType {
    constructor(_name, _module, _baseType) {
        super(_name, _module, GenericDataTypeType.Enum);
        this.baseType = _baseType;
        this.values = [];
    }
}
exports.GenericDataEnum = GenericDataEnum;
class GenericDataStructField {
}
exports.GenericDataStructField = GenericDataStructField;
class GenericDataStruct extends GenericDataType {
    constructor(_name, _module, _baseType) {
        super(_name, _module, GenericDataTypeType.Struct);
        this.baseType = _baseType;
        this.fields = [];
    }
}
exports.GenericDataStruct = GenericDataStruct;
//# sourceMappingURL=types.genericdata.js.map