import * as tslib_1 from "tslib";
import React, { forwardRef } from 'react';
import classNames from 'classnames';
var CellMask = forwardRef(function CellMask(_a, ref) {
    var width = _a.width, height = _a.height, top = _a.top, left = _a.left, zIndex = _a.zIndex, className = _a.className, props = tslib_1.__rest(_a, ["width", "height", "top", "left", "zIndex", "className"]);
    return (React.createElement("div", tslib_1.__assign({ className: classNames('rdg-cell-mask', className), style: {
            height: height,
            width: width,
            zIndex: zIndex,
            transform: "translate(" + left + "px, " + top + "px)"
        }, "data-test": "cell-mask", ref: ref }, props)));
});
export default CellMask;
//# sourceMappingURL=CellMask.js.map