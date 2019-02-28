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
var outfile = function (interfaces, dir) {
    var methodInterfaces = {
        get: [],
        post: [],
        put: [],
        delete: []
    };
    interfaces.forEach(function (i) {
        // 创建每个route对应的interface文件
        fs.outputFileSync(path.resolve(dir, i.fileName), i.content);
        methodInterfaces[i.method].push(i.path);
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
            var name = "" + firstWordUpper(method) + path2Hump(paths);
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