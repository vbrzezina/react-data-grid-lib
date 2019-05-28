(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var React = require("react");
    var SimpleTextEditor = /** @class */ (function (_super) {
        tslib_1.__extends(SimpleTextEditor, _super);
        function SimpleTextEditor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.input = React.createRef();
            return _this;
        }
        SimpleTextEditor.prototype.getInputNode = function () {
            return this.input.current;
        };
        SimpleTextEditor.prototype.getValue = function () {
            var _a;
            return _a = {},
                _a[this.props.column.key] = this.input.current.value,
                _a;
        };
        SimpleTextEditor.prototype.render = function () {
            return (React.createElement("input", { className: "form-control", ref: this.input, defaultValue: this.props.value, onBlur: this.props.onBlur }));
        };
        return SimpleTextEditor;
    }(React.Component));
    exports.default = SimpleTextEditor;
});
//# sourceMappingURL=SimpleTextEditor.js.map