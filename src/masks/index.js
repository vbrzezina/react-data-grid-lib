(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./EventBus", "./InteractionMasks"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventBus_1 = require("./EventBus");
    exports.EventBus = EventBus_1.default;
    var InteractionMasks_1 = require("./InteractionMasks");
    exports.InteractionMasks = InteractionMasks_1.default;
});
//# sourceMappingURL=index.js.map