"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = require("path");
var json_1 = require("./json");
var getAllFiles_1 = require("../utils/getAllFiles");
var transform = function (method, data) {
    var json = {
        get: {},
        post: {},
        put: {},
        delete: {},
    };
    // eslint-disable-next-line no-restricted-syntax
    var paths = Object.keys(data);
    // eslint-disable-next-line
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var api = paths_1[_i];
        console.log("scan api - " + method + " ->  " + api);
        var result = api.split(' ');
        var target = data[api][method];
        json[result[0].toLowerCase()][result[1]] = target;
    }
    return json;
};
var scan = function (options) {
    var inputDir = options.inputDir, outputDir = options.outputDir, requestOpt = options.request, responseOpt = options.response;
    var jsFiles = getAllFiles_1.getAllFiles(inputDir, 'js');
    var files = jsFiles.reduce(function (pre, cur) {
        return tslib_1.__assign({}, pre, require(cur));
    }, jsFiles[0] ? require(jsFiles[0]) : {});
    var requestJSON = transform('request', files);
    var responseJSON = transform('response', files);
    /**
     * 生成请求参数
     */
    json_1.default(requestJSON, path.resolve(outputDir, './requests'), requestOpt);
    /**
     * 生成响应参数
     */
    json_1.default(responseJSON, path.resolve(outputDir, './responses'), responseOpt);
    console.log("scan success! total: " + Object.keys(files).length + " API");
};
exports.default = scan;
//# sourceMappingURL=scan.js.map