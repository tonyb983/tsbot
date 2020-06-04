"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDetailCommand = void 0;
const lodash_1 = require("lodash");
class MessageDetailCommand {
    constructor() {
        this.keyword = "detail";
        this.expectedArgCount = [0];
        this.priority = 1;
        this.displayHelp = "Displays the details for a message!";
    }
    shouldFire(keyword, args, msg) {
        return lodash_1.eq(keyword, this.keyword);
    }
    execute(args, msg) {
        return msg.reply(JSON.stringify(msg, null, 2));
    }
}
exports.MessageDetailCommand = MessageDetailCommand;
//# sourceMappingURL=MessageDetailCommand.js.map