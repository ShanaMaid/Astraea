"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (blackList, interfaces) {
    return interfaces.filter(function (i) {
        return !blackList.some(function (b) {
            return b === "" + i.method.toUpperCase() + i.path;
        });
    });
});
//# sourceMappingURL=filter.js.map