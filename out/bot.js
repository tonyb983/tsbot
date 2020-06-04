"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const lodash_1 = require("lodash");
const CommandBrain_1 = require("./commands/CommandBrain");
let Bot = /** @class */ (() => {
    let Bot = class Bot {
        constructor(client, token, prefix, commandBrain) {
            this.client = client;
            this.token = token;
            this.prefix = prefix;
            this.commandBrain = commandBrain;
        }
        listen() {
            this.client.on('message', (msg) => {
                console.log("Message Detected - ", msg.content);
                if (!lodash_1.startsWith(msg.content, this.prefix)) {
                    console.log("Bot prefix not detected, ignoring message.");
                    return;
                }
                if (msg.author.bot) {
                    console.log("Ignoring Bot Message.");
                    return;
                }
                this.commandBrain.handle(msg)
                    .then(() => {
                    console.log("Response sent.");
                })
                    .catch(() => {
                    console.log("Response not sent.");
                });
            });
            return this.client.login(this.token);
        }
    };
    Bot = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.TYPES.Client)),
        __param(1, inversify_1.inject(types_1.TYPES.Token)),
        __param(2, inversify_1.inject(types_1.TYPES.Prefix)),
        __param(3, inversify_1.inject(types_1.TYPES.CommandBrain)),
        __metadata("design:paramtypes", [discord_js_1.Client, String, String, CommandBrain_1.CommandBrain])
    ], Bot);
    return Bot;
})();
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map