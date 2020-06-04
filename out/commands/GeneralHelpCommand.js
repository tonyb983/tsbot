"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralHelpCommand = void 0;
const lodash_1 = require("lodash");
class GeneralHelpCommand {
    constructor() {
        this.priority = -1;
        this.keyword = "help";
        this.expectedArgCount = [0];
        this.helpText = "This is the general help text!";
        this.displayHelp = "Displays general help.";
    }
    shouldFire(keyword, args, msg) {
        return lodash_1.eq(keyword, this.keyword);
    }
    ;
    execute(args, msg) {
        return msg.reply(this.helpText);
    }
}
exports.GeneralHelpCommand = GeneralHelpCommand;
//# sourceMappingURL=GeneralHelpCommand.js.map