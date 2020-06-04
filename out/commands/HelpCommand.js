"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const lodash_1 = require("lodash");
class HelpCommand {
    constructor() {
        this.priority = -1;
        this.keyword = "help";
        this.expectedArgCount = [0, 1];
        this.displayHelp = "Displays general help or help with a specific command if used with an argument.";
    }
    shouldFire(keyword, args, msg) {
        if (lodash_1.eq(lodash_1.lowerCase(keyword), this.keyword)) {
            if (lodash_1.isString(args)) {
                return true;
            }
            if (lodash_1.isArray(args) && (args.length === 0 || args.length === 1)) {
                return true;
            }
        }
        return false;
    }
    ;
}
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=HelpCommand.js.map