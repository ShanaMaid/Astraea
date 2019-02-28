"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable no-any
var json2ts = require('./src/json2ts');
var handle = new json2ts.Json2Ts();
var getType = function (a) { return Object.prototype.toString.call(a); };
exports.default = (function (source) {
    var type = getType(source);
    if (type === '[object Array]') {
        var temp = source[0];
        var type_1 = getType(temp);
        if (temp === undefined || temp === null || type_1 === '[object Array]') {
            return "export type RootObject = any[];";
        }
        else if (type_1 === '[object Object]') {
            var str = handle.convert(JSON.stringify(temp || {}));
            str = str.replace(/(export interface) RootObject/, '$1 OldRootObject');
            str += "\r\nexport type RootObject = OldRootObject[];";
            return str;
        }
        else {
            return "export type RootObject = " + typeof source[0] + "[];";
        }
    }
    else if (type === '[object Object]') {
        return handle.convert(JSON.stringify(source || {}));
    }
    else if (type === '[object Null]' || type === '[object Undefined]') {
        return "export type RootObject = any;";
    }
    else {
        return "export type RootObject = " + typeof source + ";";
    }
});
//# sourceMappingURL=index.js.map