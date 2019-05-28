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
    function DragHandle(_a) {
        var onDragStart = _a.onDragStart, onDragEnd = _a.onDragEnd, onDoubleClick = _a.onDoubleClick;
        return (React.createElement("div", { className: "drag-handle", draggable: true, onDragStart: onDragStart, onDragEnd: onDragEnd, onDoubleClick: onDoubleClick }));
    }
    exports.default = DragHandle;
});
//# sourceMappingURL=DragHandle.js.map