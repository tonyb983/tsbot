import { Message } from 'discord.js';
import { eq, isString, isArray, lowerCase } from 'lodash';

import { CommandModule } from './CommandBrain';
import { isNullOrUndefined } from 'util';

export class GeneralHelpCommand implements CommandModule {
    public readonly priority: number = -1;
    public readonly keyword: string = "help";
    public readonly expectedArgCount: number | number[] = [0];

    private readonly helpText = "This is the general help text!";

    shouldFire(keyword: string, args: string | string[], msg: Message): boolean {
        return eq(keyword, this.keyword);
    };

    displayHelp = "Displays general help.";
    execute(args: string | string[], msg: Message) {
        return msg.reply(this.helpText);
    }
}