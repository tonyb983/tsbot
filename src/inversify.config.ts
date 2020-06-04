import "reflect-metadata";

import { Container } from "inversify";
import { Client } from "discord.js";
import { eq, lowerCase } from 'lodash';

import { CommandBrain } from './commands/CommandBrain';
import { CommandModuleInitializer } from './commands/CommandModuleInitializer';
import { TYPES } from "./types";
import { DefaultPrefix, DefaultIgnoreBots, DefaultDebugLevel, DebugLevels } from './globals';
import { Bot } from "./bot";

let container = new Container();

let prefix = DefaultPrefix;
if("PREFIX" in process.env){
    console.log("Environmental Variable 'PREFIX' Found, Using Value.");
    prefix = process.env.PREFIX;
} else {
    console.log("Environmental Variable 'PREFIX' Not Found, Using Default Value.");
}

let ignoreBots = DefaultIgnoreBots;
if("IGNORE_BOTS" in process.env){
    let temp = lowerCase(process.env.IGNORE_BOTS);

    if(temp === "true" || temp === "false"){
        console.log("Environmental Variable 'IGNORE_BOTS' Found, Using Value.");
        ignoreBots = temp === "true" ? true : false;
    } else{
        console.log("Environmental Variable 'IGNORE_BOTS' Found But Not Valid, Using Default Value.");
    }
} else {
    console.log("Environmental Variable 'IGNORE_BOTS' Not Found, Using Default Value.");
}

let debugLevel = DefaultDebugLevel;
if("DEBUG_LEVEL" in process.env){
    let dl = lowerCase(process.env.DEBUG_LEVEL);

    if(dl === "verbose"){
        debugLevel = DebugLevels.Verbose;
        console.log("DebugLevel Set To Verbose.");
    } else if(dl === "info") {
        debugLevel = DebugLevels.Info;
        console.log("DebugLevel Set To Info.");
    } else if(dl === "warning") {
        debugLevel = DebugLevels.Warning;
        console.log("DebugLevel Set To Warning.");
    } else if(dl === "error") {
        debugLevel = DebugLevels.Error;
        console.log("DebugLevel Set To Error.");
    } else {
        console.log("Unrecognized DebugLevel '" + process.env.DEBUG_LEVEL + "', Using Default Value.");
    }
} else {
    console.log("Environmental Variable 'DEBUG_LEVEL' Not Found, Using Default Value.");
}

container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string>(TYPES.Prefix).toConstantValue(prefix);
container.bind<boolean>(TYPES.IgnoreBots).toConstantValue(ignoreBots);
container.bind<DebugLevels>(TYPES.DebugLevel).toConstantValue(debugLevel);

container.bind<CommandBrain>(TYPES.CommandBrain).to(CommandBrain).inSingletonScope();
container.bind<CommandModuleInitializer>(TYPES.CommandModuleInitializer).to(CommandModuleInitializer).inSingletonScope();
container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());

export default container;