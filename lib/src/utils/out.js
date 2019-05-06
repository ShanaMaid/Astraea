"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var name_1 = require("./name");
var firstWordUpper = name_1.default.firstWordUpper, path2Hump = name_1.default.path2Hump;
/**
 * 输出route描述文件
 * @param interfaces interface相关描述数组
 * @param dir 输出路径
 */
var outfile = function (interfaces, dir, opt) {
    var methodInterfaces = {
        get: [],
        post: [],
        put: [],
        delete: []
    };
    var _a = opt || {}, _b = _a.blackList, blackList = _b === void 0 ? [] : _b, _c = _a.optional, optional = _c === void 0 ? false : _c;
    interfaces.forEach(function (i) {
        methodInterfaces[i.method].push(i.path);
        // 创建每个route对应的interface文件
        var name = "" + i.method.toUpperCase() + i.path;
        if (blackList && blackList.indexOf(name) !== -1) {
            return;
        }
        var content = i.content;
        if (optional) {
            content = content.replace(/: !(any)/g, '?: ');
        }
        fs.outputFileSync(path.resolve(dir, i.fileName), content);
    });
    // 生成汇总routes.ts文件
    var routesFileName = path.resolve(dir, './routes.ts');
    var output = '';
    var headImport = [];
    var methods = Object.keys(methodInterfaces);
    var _loop_1 = function (method) {
        var temp = [];
        output += "export interface I" + firstWordUpper(method) + "Routes {\r\n";
        methodInterfaces[method].forEach(function (paths) {
            var name = ("" + firstWordUpper(method) + path2Hump(paths)).replace(/-/g, '$');
            headImport.push("import { RootObject as " + name + " } from './" + method.toUpperCase() + paths + "';");
            temp.push("  '" + paths + "': " + name + ";");
        });
        output += temp.join('\r\n');
        output += "\r\n}\r\n\r\n";
    };
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var method = methods_1[_i];
        _loop_1(method);
    }
    var fileContent = headImport.join('\r\n') + '\r\n\r\n' + output;
    fs.outputFileSync(routesFileName, fileContent);
};
exports.default = outfile;
//# sourceMappingURL=out.js.map