"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_1 = require("./adapters/json");
var swagger_1 = require("./adapters/swagger");
var scan_1 = require("./adapters/scan");
exports.default = {
    json: json_1.default,
    swagger: swagger_1.default,
    scan: scan_1.default,
};
//# sourceMappingURL=index.js.map