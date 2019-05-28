(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    function SimpleCellFormatter(_a) {
        var value = _a.value;
        return React.createElement("div", { title: String(value) }, value);
    }
    exports.SimpleCellFormatter = SimpleCellFormatter;
});
//# sourceMappingURL=SimpleCellFormatter.js.map