"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDebugLevel = exports.DebugLevels = exports.DefaultIgnoreBots = exports.DefaultPrefix = void 0;
exports.DefaultPrefix = "ts?";
exports.DefaultIgnoreBots = true;
var DebugLevels;
(function (DebugLevels) {
    DebugLevels[DebugLevels["Verbose"] = 0] = "Verbose";
    DebugLevels[DebugLevels["Info"] = 1] = "Info";
    DebugLevels[DebugLevels["Warning"] = 2] = "Warning";
    DebugLevels[DebugLevels["Error"] = 3] = "Error";
})(DebugLevels = exports.DebugLevels || (exports.DebugLevels = {}));
exports.DefaultDebugLevel = DebugLevels.Verbose;
//# sourceMappingURL=globals.js.map