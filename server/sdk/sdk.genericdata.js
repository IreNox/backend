"use strict";
const fs = require("fs");
const libxmljs = require("libxmljs");
const sdk = require("../sdk");
const gd = require("../types/types.genericdata");
class GenericDataFile {
}
class SdkGenericData {
    constructor() {
        this.types = [];
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
        let queue = [];
        let files = fs.readdirSync("./data/genericdata");
        files.forEach(function (file) {
            if (!sdk.core.endsWith(file, ".tikigenerictypes")) {
                return;
            }
            let filename = sdk.core.getFilename(file);
            let fileContent = fs.readFileSync("./data/genericdata/" + file, "utf8");
            let xmlDoc = libxmljs.parseXml(fileContent);
            queue.push({ filename: filename, document: xmlDoc });
        });
        queue = queue.sort(function (a, b) {
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
            let file = queue[index];
            this.addTypes(file);
        }
    }
    findTypeByName(name) {
        return this.types.find(type => type.name == name);
    }
    findTypeByNameAndType(name, type) {
        return this.types.find(t => t.name == name && t.type == type);
    }
    findEnumByName(name) {
        return this.findTypeByNameAndType(name, gd.GenericDataTypeType.Enum).asEnum();
    }
    findStructByName(name) {
        return this.findTypeByNameAndType(name, gd.GenericDataTypeType.Struct).asStruct();
    }
    findValueTypeByName(name) {
        return this.findTypeByNameAndType(name, gd.GenericDataTypeType.ValueType).asValueType();
    }
    addTypes(file) {
        let xmlDoc = file.document;
        let enumDefaultBaseType = this.findValueTypeByName("sint32");
        let typeNodes = xmlDoc.root().childNodes();
        for (var typeIndex in typeNodes) {
            let typeNode = typeNodes[typeIndex];
            let typeNodeType = typeNode.name().toLowerCase();
            if (typeNodeType == "text" || typeNodeType == "comment") {
                continue;
            }
            let typeNameAttr = typeNode.attr("name");
            if (typeNameAttr == null) {
                console.log("Type has no name attribute");
                continue;
            }
            let typeName = typeNameAttr.value();
            var typeBaseType = null;
            let typeBaseTypeAttr = typeNode.attr("base");
            if (typeBaseTypeAttr != null) {
                typeBaseType = this.findTypeByName(typeBaseTypeAttr.value());
            }
            var type = null;
            if (typeNodeType == "enum") {
                let enumBaseType = typeBaseType.asValueType() || enumDefaultBaseType;
                let enumType = new gd.GenericDataEnum(typeName, file.filename, enumBaseType);
                var currentValue = 0;
                let valueNodes = typeNode.childNodes();
                for (var valueIndex in valueNodes) {
                    let valueNode = valueNodes[valueIndex];
                    if (valueNode.name().toLowerCase() !== "value") {
                        continue;
                    }
                    let valueNameAttr = valueNode.attr("name");
                    if (valueNameAttr == null) {
                        console.log("Enum value has no name attribute in " + typeName);
                        continue;
                    }
                    let valueValueAttr = valueNode.attr("value");
                    if (valueValueAttr != null) {
                        currentValue = Number(valueValueAttr.value());
                    }
                    let value = new gd.GenericDataEnumValue();
                    value.name = valueNameAttr.value();
                    value.value = currentValue;
                    enumType.values.push(value);
                    currentValue++;
                }
                type = enumType;
            }
            else if (typeNodeType == "struct") {
                var structBaseType = null;
                if (typeBaseType) {
                    structBaseType = typeBaseType.asStruct();
                }
                let structType = new gd.GenericDataStruct(typeName, file.filename, structBaseType);
                let fieldNodes = typeNode.childNodes();
                for (var fieldIndex in fieldNodes) {
                    let fieldNode = fieldNodes[fieldIndex];
                    if (fieldNode.name().toLowerCase() !== "field") {
                        continue;
                    }
                    let fieldNameAttr = fieldNode.attr("name");
                    if (fieldNameAttr == null) {
                        console.log("Field has no name attribute in " + typeName);
                        continue;
                    }
                    var fieldType = null;
                    let fieldTypeAttr = fieldNode.attr("type");
                    if (fieldTypeAttr != null) {
                        fieldType = this.findTypeByName(fieldTypeAttr.value());
                    }
                    if (fieldType == null) {
                        console.log("Field has no type in " + typeName);
                        continue;
                    }
                    let field = new gd.GenericDataStructField();
                    field.name = fieldNameAttr.value();
                    field.type = fieldType;
                    structType.fields.push(field);
                }
                type = structType;
            }
            else {
                console.log(`Invalid GenericData type ${typeName} in ${file.filename}`);
            }
            if (!type) {
                console.log(`Failed to generate ${typeName} in ${file.filename}`);
                continue;
            }
            this.types.push(type);
        }
    }
    addValueType(name, baseType) {
        let valueType = new gd.GenericDataValueType(name, "base", baseType);
        this.types.push(valueType);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SdkGenericData;
//# sourceMappingURL=sdk.genericdata.js.map