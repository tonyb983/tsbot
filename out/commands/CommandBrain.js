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
exports.CommandBrain = void 0;
const lodash_1 = require("lodash");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const CommandModuleInitializer_1 = require("./CommandModuleInitializer");
let CommandBrain = /** @class */ (() => {
    let CommandBrain = class CommandBrain {
        constructor(commandModuleInitializer) {
            let r = commandModuleInitializer.GetModules();
            this.helpModule = r.helpModule;
            this.modules = r.otherModules;
        }
        handle(msg) {
            console.log("CommandBrain Handling Message.");
            let ws = lodash_1.drop(lodash_1.words(msg.content), 1);
            let kw = lodash_1.first(ws);
            let args = lodash_1.drop(ws, 1);
            let firstArg = lodash_1.first(args);
            console.log("ws = " + JSON.stringify(ws));
            console.log("kw = " + kw);
            console.log("args = " + JSON.stringify(args));
            console.log("firstArg = " + firstArg);
            if (kw === "help") {
                return this.helpModule.execute(args, msg);
            }
            let allHandlers = lodash_1.sortBy(lodash_1.filter(this.modules, (cm, i, coll) => cm.shouldFire(kw, args, msg)), "priority");
            console.log("CommandBrain: Found " + allHandlers.length + " handlers for this command.");
            if (allHandlers.length > 0) {
                console.log("Handlers: " + JSON.stringify(allHandlers, null, 2));
            }
            if (allHandlers.length > 0) {
                return lodash_1.last(allHandlers).execute(args, msg);
            }
            return Promise.reject();
        }
    };
    CommandBrain = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.TYPES.CommandModuleInitializer)),
        __metadata("design:paramtypes", [CommandModuleInitializer_1.CommandModuleInitializer])
    ], CommandBrain);
    return CommandBrain;
})();
exports.CommandBrain = CommandBrain;
//# sourceMappingURL=CommandBrain.js.map