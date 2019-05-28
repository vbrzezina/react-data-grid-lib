(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./test/GridPropHelpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GridPropHelpers_1 = require("./test/GridPropHelpers");
    exports.test = { GridPropHelpers: GridPropHelpers_1.default };
});
//# sourceMappingURL=index.js.map