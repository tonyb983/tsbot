import { Message } from 'discord.js';
import { eq, isString, isArray, lowerCase } from 'lodash';

import { CommandModule } from './CommandBrain';
import { isNullOrUndefined } from 'util';

export class PongCommand implements CommandModule {
    public readonly keyword: string = "ping";
    public readonly expectedArgCount: number | number[] = 0;
    public readonly priority: number = 1;

    shouldFire(keyword: string, args: string | string[], msg: Message): boolean {
        return eq(keyword, this.keyword) && (isNullOrUndefined(args) || (isArray(args) && args.length < 1));
    }

    displayHelp() {
        return "Replies to Ping with the word Pong!";
    }

    execute(args: string | string[], msg: Message) {
        return msg.reply("Pong!");
    }

}