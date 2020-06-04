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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandModuleInitializer = void 0;
const inversify_1 = require("inversify");
const PongCommand_1 = require("./PongCommand");
const GeneralHelpCommand_1 = require("./GeneralHelpCommand");
const MessageDetailCommand_1 = require("./MessageDetailCommand");
const HelpModule = new GeneralHelpCommand_1.GeneralHelpCommand();
const IncludedModules = [
    new PongCommand_1.PongCommand(),
    new MessageDetailCommand_1.MessageDetailCommand()
];
let CommandModuleInitializer = /** @class */ (() => {
    let CommandModuleInitializer = class CommandModuleInitializer {
        constructor() {
            this.modules = [];
            this.isInit = false;
            this.modules = IncludedModules;
            this.helpModule = HelpModule;
            this.isInit = true;
        }
        GetModules() {
            if (!this.isInit) {
                throw new Error("CommandModuleInitializer not initialized.");
            }
            return {
                helpModule: this.helpModule,
                otherModules: this.modules
            };
        }
    };
    CommandModuleInitializer = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], CommandModuleInitializer);
    return CommandModuleInitializer;
})();
exports.CommandModuleInitializer = CommandModuleInitializer;
//# sourceMappingURL=CommandModuleInitializer.js.map