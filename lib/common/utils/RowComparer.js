(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function shouldRowUpdate(nextProps, currentProps) {
        return currentProps.columns !== nextProps.columns
            || nextProps.row !== currentProps.row
            || currentProps.colOverscanStartIdx !== nextProps.colOverscanStartIdx
            || currentProps.colOverscanEndIdx !== nextProps.colOverscanEndIdx
            || currentProps.isSelected !== nextProps.isSelected
            || currentProps.isScrolling !== nextProps.isScrolling
            || nextProps.height !== currentProps.height
            || currentProps.extraClasses !== nextProps.extraClasses;
    }
    exports.default = shouldRowUpdate;
});
//# sourceMappingURL=RowComparer.js.map