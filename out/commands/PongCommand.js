"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongCommand = void 0;
const lodash_1 = require("lodash");
const util_1 = require("util");
class PongCommand {
    constructor() {
        this.keyword = "ping";
        this.expectedArgCount = 0;
        this.priority = 1;
    }
    shouldFire(keyword, args, msg) {
        return lodash_1.eq(keyword, this.keyword) && (util_1.isNullOrUndefined(args) || (lodash_1.isArray(args) && args.length < 1));
    }
    displayHelp() {
        return "Replies to Ping with the word Pong!";
    }
    execute(args, msg) {
        return msg.reply("Pong!");
    }
}
exports.PongCommand = PongCommand;
//# sourceMappingURL=PongCommand.js.map