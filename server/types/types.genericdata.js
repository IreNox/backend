"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (GenericDataTypeType) {
    GenericDataTypeType[GenericDataTypeType["ValueType"] = 0] = "ValueType";
    GenericDataTypeType[GenericDataTypeType["Enum"] = 1] = "Enum";
    GenericDataTypeType[GenericDataTypeType["Struct"] = 2] = "Struct";
})(exports.GenericDataTypeType || (exports.GenericDataTypeType = {}));
var GenericDataTypeType = exports.GenericDataTypeType;
var GenericDataType = (function () {
    function GenericDataType() {
    }
    return GenericDataType;
}());
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
var GenericDataValueType = (function (_super) {
    __extends(GenericDataValueType, _super);
    function GenericDataValueType() {
        _super.apply(this, arguments);
    }
    return GenericDataValueType;
}(GenericDataType));
exports.GenericDataValueType = GenericDataValueType;
var GenericDataEnumValue = (function () {
    function GenericDataEnumValue() {
    }
    return GenericDataEnumValue;
}());
exports.GenericDataEnumValue = GenericDataEnumValue;
var GenericDataEnum = (function (_super) {
    __extends(GenericDataEnum, _super);
    function GenericDataEnum() {
        _super.apply(this, arguments);
    }
    return GenericDataEnum;
}(GenericDataType));
exports.GenericDataEnum = GenericDataEnum;
var GenericDataStructField = (function () {
    function GenericDataStructField() {
    }
    return GenericDataStructField;
}());
exports.GenericDataStructField = GenericDataStructField;
var GenericDataStruct = (function (_super) {
    __extends(GenericDataStruct, _super);
    function GenericDataStruct() {
        _super.apply(this, arguments);
    }
    return GenericDataStruct;
}(GenericDataType));
exports.GenericDataStruct = GenericDataStruct;
//# sourceMappingURL=types.genericdata.js.map