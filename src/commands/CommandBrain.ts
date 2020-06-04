import { Message } from "discord.js";
import { isArray, filter, sortBy, last, words, drop, first, isString, isFunction } from 'lodash';
import { inject, injectable } from "inversify";

import { StringGetter } from './../types';
import { TYPES } from "../types";
import { CommandModuleInitializer } from "./CommandModuleInitializer";

export interface CommandModule {
    keyword: string;
    expectedArgCount: number | number[];
    priority: number;
    displayHelp: StringGetter;
    shouldFire: (keyword: string, args: string | string[], msg: Message) => boolean;
    execute: (args: string | string[], msg: Message) => Promise<Message | Message[]>;
}

export interface ICommandBrain {
    helpModule: CommandModule;
    modules: CommandModule[];
    handle: (msg: Message) => Promise<Message | Message[]>;
}

@injectable()
export class CommandBrain implements ICommandBrain {
    public readonly helpModule: CommandModule;
    public readonly modules: CommandModule[];

    constructor(
        @inject(TYPES.CommandModuleInitializer) commandModuleInitializer: CommandModuleInitializer
    ){
        let r = commandModuleInitializer.GetModules();
        this.helpModule = r.helpModule;
        this.modules = r.otherModules;
    }

    handle(msg: Message): Promise<Message | Message[]> {
        console.log("CommandBrain Handling Message.");


        let ws = drop(words(msg.content), 1);
        let kw = first(ws);
        let args = drop(ws, 1);
        let firstArg = first(args);

        console.log("ws = " + JSON.stringify(ws));
        console.log("kw = " + kw);
        console.log("args = " + JSON.stringify(args));
        console.log("firstArg = " + firstArg);

        if(kw === "help"){
            return this.helpModule.execute(args, msg);
        }

        let allHandlers = sortBy(filter(this.modules, (cm, i, coll) => cm.shouldFire(kw, args, msg)), "priority");

        console.log("CommandBrain: Found " + allHandlers.length + " handlers for this command.");
        if(allHandlers.length > 0){
            console.log("Handlers: " + JSON.stringify(allHandlers, null, 2));
        }

        if(allHandlers.length > 0){
            return last(allHandlers).execute(args, msg);
        }

        return Promise.reject();
    }
}