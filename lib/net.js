"use strict";
/**
 * 网络库接入高阶函数
 * 减少对代码的侵入
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * restfulPath: /asas/:name/:id
 * restful: { name: 'goods', id: '121212'}
 * path: /asas/goods/121212
 * @param restfulPath restful 路径
 * @param params restful参数
 */
exports.restfulPath2path = function (path, restful) {
    var url = path;
    Object.entries(restful).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        url = url.replace(new RegExp(":" + key, 'g'), value);
    });
    return url;
};
var NetBase = /** @class */ (function () {
    function NetBase() {
        var _this = this;
        this.getApi = function (url) {
            return function (params, extra) {
                var path = exports.restfulPath2path(url, extra._restful || {});
                delete extra._restful;
                return _this.get(path, params, extra);
            };
        };
        this.postApi = function (url) {
            return function (params, extra) {
                var path = exports.restfulPath2path(url, extra._restful || {});
                delete extra._restful;
                return _this.post(path, params, extra);
            };
        };
        this.deleteApi = function (url) {
            return function (params, extra) {
                var path = exports.restfulPath2path(url, extra._restful || {});
                delete extra._restful;
                return _this.delete(path, params, extra);
            };
        };
        this.putApi = function (url) {
            return function (params, extra) {
                var path = exports.restfulPath2path(url, extra._restful || {});
                delete extra._restful;
                return _this.put(path, params, extra);
            };
        };
    }
    return NetBase;
}());
exports.NetBase = NetBase;
//# sourceMappingURL=net.js.map