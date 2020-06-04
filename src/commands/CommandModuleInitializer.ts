import { inject, injectable } from "inversify";

import { PongCommand } from './PongCommand';
import { CommandModule } from "./CommandBrain";
import { GeneralHelpCommand } from "./GeneralHelpCommand";
import { MessageDetailCommand } from './MessageDetailCommand';

const HelpModule = new GeneralHelpCommand();
const IncludedModules: CommandModule[] = [
    new PongCommand(),
    new MessageDetailCommand()
]

@injectable()
export class CommandModuleInitializer {
    private readonly helpModule: CommandModule;
    private readonly modules: CommandModule[] = [];
    private isInit: boolean = false;

    constructor(){
        this.modules = IncludedModules;
        this.helpModule = HelpModule;
        this.isInit = true;
    }

    GetModules() {
        if(!this.isInit){
            throw new Error("CommandModuleInitializer not initialized.");
        }

        return {
            helpModule: this.helpModule,
            otherModules: this.modules
        };
    }

}