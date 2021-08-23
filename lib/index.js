"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var common_1 = require("./common");
var firstWordUpper = function (s) {
    var temp = s.split('');
    if (temp[0]) {
        temp[0] = temp[0].toUpperCase();
    }
    return temp.join('');
};
var path2Hump = function (s) {
    var temp = s.split('/');
    return temp.map(function (item) {
        return firstWordUpper(item.replace(/:/g, ''));
    }).join('');
};
var replaceSensitiveChar = function (str) {
    var r = str.replace(/-/g, '$')
        .replace(/\+/g, '#')
        .replace(/:/g, '@');
    return r;
};
var Astraea = /** @class */ (function () {
    function Astraea(p) {
        var _this = this;
        // 格式化文件
        this.formatFile = function (filePath) {
            var content = fs.readFileSync(filePath, {
                encoding: 'utf8'
            });
            var match = content.match(/@@(.+)@@/);
            if (!match) {
                return undefined;
            }
            var _a = match[1].trim().split(' '), method = _a[0], url = _a[1];
            return {
                method: method.toLowerCase(),
                url: url,
                fileName: replaceSensitiveChar("./" + method.toUpperCase() + url + ".ts"),
                content: content,
            };
        };
        this.scanTypeFiles = function (dir) {
            var files = common_1.getAllFiles(dir, 'd.ts');
            return files;
        };
        /**
       * 输出route描述文件
       * @param interfaces interface相关描述数组
       * @param dir 输出路径
       */
        this.outfile = function (interfaces) {
            var dir = _this.params.typingDir;
            var methodInterfaces = {
                get: [],
                post: [],
                put: [],
                delete: []
            };
            interfaces.forEach(function (i) {
                methodInterfaces[i.method].push(i.url);
                fs.outputFileSync(path.resolve(dir, i.fileName), i.content);
            });
            // 生成汇总routes.ts文件
            var requestFileName = path.resolve(dir, './request.ts');
            var responseFileName = path.resolve(dir, './response.ts');
            var requestOutput = '';
            var responseOutput = '';
            var requestHeadImport = [];
            var responseHeadImport = [];
            var methods = Object.keys(methodInterfaces);
            var _loop_1 = function (method) {
                var requestTemp = [];
                var responsetemp = [];
                requestOutput += "export interface I" + firstWordUpper(method) + "Routes {\r\n";
                responseOutput += "export interface I" + firstWordUpper(method) + "Routes {\r\n";
                methodInterfaces[method].forEach(function (url) {
                    var name = replaceSensitiveChar("" + firstWordUpper(method) + path2Hump(url));
                    var requestName = name + "Request";
                    var responseName = name + "Response";
                    var filePath = replaceSensitiveChar(url);
                    requestHeadImport.push("import { RequestObject as " + requestName + " } from './" + method.toUpperCase() + filePath + "';");
                    responseHeadImport.push("import { ResponseObject as " + responseName + " } from './" + method.toUpperCase() + filePath + "';");
                    requestTemp.push("  '" + url + "': " + requestName + ";");
                    responsetemp.push("  '" + url + "': " + responseName + ";");
                });
                requestOutput += requestTemp.join('\r\n');
                requestOutput += "\r\n}\r\n\r\n";
                responseOutput += responsetemp.join('\r\n');
                responseOutput += "\r\n}\r\n\r\n";
            };
            for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
                var method = methods_1[_i];
                _loop_1(method);
            }
            var requestfileContent = requestHeadImport.join('\r\n') + '\r\n\r\n' + requestOutput;
            var responsefileContent = responseHeadImport.join('\r\n') + '\r\n\r\n' + responseOutput;
            fs.outputFileSync(requestFileName, requestfileContent);
            fs.outputFileSync(responseFileName, responsefileContent);
        };
        this.start = function () {
            var files = _this.scanTypeFiles(_this.params.sourceDir);
            var result = [];
            files.map(_this.formatFile).forEach(function (_) {
                if (_) {
                    result.push(_);
                }
            });
            _this.outfile(result);
            fs.writeFileSync(path.resolve(_this.params.typingDir, './netTypings.d.ts'), "import * as IReqRoutes from './request';\nimport * as IResRoutes from './response';\n\ndeclare module 'astraea' {\n  interface IReqGetRoutes extends IReqRoutes.IGetRoutes { }\n  interface IResGetRoutes extends IResRoutes.IGetRoutes { }\n  interface IReqPostRoutes extends IReqRoutes.IPostRoutes { }\n  interface IResPostRoutes extends IResRoutes.IPostRoutes { }\n  interface IReqPutRoutes extends IReqRoutes.IPutRoutes { }\n  interface IResPutRoutes extends IResRoutes.IPutRoutes { }\n  interface IReqDeleteRoutes extends IReqRoutes.IDeleteRoutes { }\n  interface IResDeleteRoutes extends IResRoutes.IDeleteRoutes { }\n}");
        };
        this.params = p;
    }
    return Astraea;
}());
exports.Astraea = Astraea;
//# sourceMappingURL=index.js.map