"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const discord_js_1 = require("discord.js");
const lodash_1 = require("lodash");
const CommandBrain_1 = require("./commands/CommandBrain");
const CommandModuleInitializer_1 = require("./commands/CommandModuleInitializer");
const types_1 = require("./types");
const globals_1 = require("./globals");
const bot_1 = require("./bot");
let container = new inversify_1.Container();
let prefix = globals_1.DefaultPrefix;
if ("PREFIX" in process.env) {
    console.log("Environmental Variable 'PREFIX' Found, Using Value.");
    prefix = process.env.PREFIX;
}
else {
    console.log("Environmental Variable 'PREFIX' Not Found, Using Default Value.");
}
let ignoreBots = globals_1.DefaultIgnoreBots;
if ("IGNORE_BOTS" in process.env) {
    let temp = lodash_1.lowerCase(process.env.IGNORE_BOTS);
    if (temp === "true" || temp === "false") {
        console.log("Environmental Variable 'IGNORE_BOTS' Found, Using Value.");
        ignoreBots = temp === "true" ? true : false;
    }
    else {
        console.log("Environmental Variable 'IGNORE_BOTS' Found But Not Valid, Using Default Value.");
    }
}
else {
    console.log("Environmental Variable 'IGNORE_BOTS' Not Found, Using Default Value.");
}
let debugLevel = globals_1.DefaultDebugLevel;
if ("DEBUG_LEVEL" in process.env) {
    let dl = lodash_1.lowerCase(process.env.DEBUG_LEVEL);
    if (dl === "verbose") {
        debugLevel = globals_1.DebugLevels.Verbose;
        console.log("DebugLevel Set To Verbose.");
    }
    else if (dl === "info") {
        debugLevel = globals_1.DebugLevels.Info;
        console.log("DebugLevel Set To Info.");
    }
    else if (dl === "warning") {
        debugLevel = globals_1.DebugLevels.Warning;
        console.log("DebugLevel Set To Warning.");
    }
    else if (dl === "error") {
        debugLevel = globals_1.DebugLevels.Error;
        console.log("DebugLevel Set To Error.");
    }
    else {
        console.log("Unrecognized DebugLevel '" + process.env.DEBUG_LEVEL + "', Using Default Value.");
    }
}
else {
    console.log("Environmental Variable 'DEBUG_LEVEL' Not Found, Using Default Value.");
}
container.bind(types_1.TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind(types_1.TYPES.Prefix).toConstantValue(prefix);
container.bind(types_1.TYPES.IgnoreBots).toConstantValue(ignoreBots);
container.bind(types_1.TYPES.DebugLevel).toConstantValue(debugLevel);
container.bind(types_1.TYPES.CommandBrain).to(CommandBrain_1.CommandBrain).inSingletonScope();
container.bind(types_1.TYPES.CommandModuleInitializer).to(CommandModuleInitializer_1.CommandModuleInitializer).inSingletonScope();
container.bind(types_1.TYPES.Bot).to(bot_1.Bot).inSingletonScope();
container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client());
exports.default = container;
//# sourceMappingURL=inversify.config.js.map