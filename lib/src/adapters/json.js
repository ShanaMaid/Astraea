"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var out_1 = require("../utils/out");
var json2ts_1 = require("../utils/json2ts");
var parse = function (json, opt) {
    var interfaces = [];
    var _a = (opt || {}).suffix, suffix = _a === void 0 ? 'ts' : _a;
    Object.keys(json).forEach(function (method) {
        var apis = json[method];
        for (var api in apis) {
            if (apis.hasOwnProperty(api)) {
                var el = apis[api];
                var pathName = "" + method.toUpperCase() + api;
                var content = typeof el === 'function' ? el() : el;
                content = json2ts_1.default(content);
                var temp = {
                    fileName: pathName + "." + suffix,
                    method: method,
                    path: api,
                    content: content,
                };
                interfaces.push(temp);
            }
        }
    });
    return interfaces;
};
exports.default = (function (json, dir, opt) {
    var result = parse(json, opt);
    out_1.default(result, dir, opt);
});
//# sourceMappingURL=json.js.map