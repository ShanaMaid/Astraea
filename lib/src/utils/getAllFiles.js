"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
exports.getAllFiles = function (dir, suffix) {
    var paths = [];
    var files = fs.readdirSync(dir);
    // eslint-disable-next-line no-restricted-syntax
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var filePath = path.resolve(dir, file);
        var stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
            paths.push.apply(paths, exports.getAllFiles(filePath, suffix));
        }
        else if (file.match(new RegExp("." + suffix + "$"))) {
            paths.push(filePath);
        }
    }
    return paths;
};
//# sourceMappingURL=getAllFiles.js.map