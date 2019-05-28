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
    var size;
    function getScrollbarSize() {
        if (size === undefined) {
            var outer = document.createElement('div');
            outer.style.width = '50px';
            outer.style.height = '50px';
            outer.style.position = 'absolute';
            outer.style.top = '-200px';
            outer.style.left = '-200px';
            var inner = document.createElement('div');
            inner.style.height = '100px';
            inner.style.width = '100%';
            outer.appendChild(inner);
            document.body.appendChild(outer);
            var outerWidth_1 = outer.clientWidth;
            outer.style.overflowY = 'scroll';
            var innerWidth_1 = inner.clientWidth;
            document.body.removeChild(outer);
            size = outerWidth_1 - innerWidth_1;
        }
        return size;
    }
    exports.default = getScrollbarSize;
});
//# sourceMappingURL=getScrollbarSize.js.map