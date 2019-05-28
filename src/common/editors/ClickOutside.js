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
    var react_1 = require("react");
    function ClickOutside(_a) {
        var onClickOutside = _a.onClickOutside, children = _a.children;
        var isClickedInside = react_1.useRef(false);
        react_1.useEffect(function () {
            function handleDocumentClick() {
                if (isClickedInside.current) {
                    isClickedInside.current = false;
                }
                else {
                    onClickOutside();
                }
            }
            document.addEventListener('click', handleDocumentClick);
            return function () {
                document.removeEventListener('click', handleDocumentClick);
            };
        }, [onClickOutside]);
        return react_1.default.cloneElement(react_1.default.Children.only(children), {
            onClickCapture: function () {
                isClickedInside.current = true;
            }
        });
    }
    exports.default = ClickOutside;
});
//# sourceMappingURL=ClickOutside.js.map