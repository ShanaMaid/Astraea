"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    firstWordUpper: firstWordUpper,
    path2Hump: path2Hump,
};
//# sourceMappingURL=name.js.map