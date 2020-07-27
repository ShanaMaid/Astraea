"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// tslint:disable no-any
var swagMock = require('swagMock');
var json2ts_1 = require("../utils/json2ts");
var out_1 = require("../utils/out");
var parse = function (swagger, opt) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var interfaces, _a, suffix, mockgen, urls, _loop_1, _i, urls_1, url;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                interfaces = [];
                _a = (opt || {}).suffix, suffix = _a === void 0 ? 'ts' : _a;
                mockgen = swagMock(swagger);
                urls = Object.keys(swagger.paths);
                _loop_1 = function (url) {
                    var methods, _loop_2, _i, methods_1, method;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                methods = Object.keys(swagger.paths[url]);
                                _loop_2 = function (method) {
                                    var pathName, temp;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                pathName = ("" + method.toUpperCase() + url).replace(/\{(.*?)\}/g, ':$1');
                                                temp = {
                                                    fileName: pathName + "." + suffix,
                                                    method: method,
                                                    path: url.replace(/\{(.*?)\}/g, ':$1'),
                                                    content: '',
                                                };
                                                // mock数据
                                                return [4 /*yield*/, new Promise(function (r) {
                                                        mockgen.responses({
                                                            path: url,
                                                            operation: method.toLowerCase(),
                                                            response: 200,
                                                        })
                                                            // tslint:disable-next-line no-any
                                                            .then(function (mock) {
                                                            var res = mock.responses;
                                                            // if (typeof res === 'object' && res !== null) {
                                                            temp.content = json2ts_1.default(res);
                                                            // } else {
                                                            // temp.content = `export type RootObject = ${typeof res}`;
                                                            // }
                                                            interfaces.push(temp);
                                                            r();
                                                        });
                                                    })];
                                            case 1:
                                                // mock数据
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                };
                                _i = 0, methods_1 = methods;
                                _a.label = 1;
                            case 1:
                                if (!(_i < methods_1.length)) return [3 /*break*/, 4];
                                method = methods_1[_i];
                                return [5 /*yield**/, _loop_2(method)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, urls_1 = urls;
                _b.label = 1;
            case 1:
                if (!(_i < urls_1.length)) return [3 /*break*/, 4];
                url = urls_1[_i];
                return [5 /*yield**/, _loop_1(url)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, interfaces];
        }
    });
}); };
exports.default = (function (swagger, dir, opt) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var result;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, parse(swagger, opt)];
            case 1:
                result = _a.sent();
                out_1.default(result, dir, opt);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=swagger.js.map