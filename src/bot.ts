import { Client, Message } from "discord.js"
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { startsWith } from 'lodash';
import { CommandBrain } from "./commands/CommandBrain";

export interface IBot {

}

@injectable()
export class Bot {
    private readonly token: string;
    public readonly prefix: string;

    private client: Client;
    private commandBrain: CommandBrain;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.Prefix) prefix: string,
        @inject(TYPES.CommandBrain) commandBrain: CommandBrain
    ){
        this.client = client;
        this.token = token;
        this.prefix = prefix;
        this.commandBrain = commandBrain;
    }

    public listen(): Promise<string> {
        this.client.on('message', (msg: Message) => {
            console.log("Message Detected - ", msg.content);

            if(!startsWith(msg.content, this.prefix)){
                console.log("Bot prefix not detected, ignoring message.")
                return;
            }

            if(msg.author.bot){
                console.log("Ignoring Bot Message.");
                return;
            }

            this.commandBrain.handle(msg)
                .then(() => {
                    console.log("Response sent.");
                })
                .catch(() => {
                    console.log("Response not sent.");
                })
        });

        return this.client.login(this.token);
    }
}