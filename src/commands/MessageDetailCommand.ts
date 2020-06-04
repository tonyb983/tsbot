import { Message } from 'discord.js';
import { eq, isString, isArray, lowerCase } from 'lodash';
import { isNullOrUndefined } from 'util';

import { CommandModule } from './CommandBrain';
import { StringGetter } from '../types';

export class MessageDetailCommand implements CommandModule {
    public readonly keyword: string = "detail";
    public readonly expectedArgCount: number | number[] = [0];
    public readonly priority: number = 1;

    public readonly displayHelp: StringGetter = "Displays the details for a message!";
    
    shouldFire(keyword: string, args: string | string[], msg: Message) {
        return eq(keyword, this.keyword);
    }

    execute(args: string | string[], msg: Message) {
        return msg.reply(JSON.stringify(msg, null, 2));
    }

}