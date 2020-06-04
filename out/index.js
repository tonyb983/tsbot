"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const inversify_config_1 = require("./inversify.config");
const types_1 = require("./types");
let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
bot.listen()
    .then(() => {
    console.log("Logged In.");
})
    .catch((e) => {
    console.log("Oh no! ", e);
});
//# sourceMappingURL=index.js.map