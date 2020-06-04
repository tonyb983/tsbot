export const TYPES = {
    Bot: Symbol("Bot"),
    Client: Symbol("Client"),
    Token: Symbol("Token"),
    Prefix: Symbol("Prefix"),
    IgnoreBots: Symbol("IgnoreBots"),
    DebugLevel: Symbol("DebugLevel"),
    CommandBrain: Symbol("CommandBrain"),
    CommandModuleInitializer: Symbol("CommandModuleInitializer"),
    HelpCommand: Symbol("HelpCommand"),
}

export type StringGetter = string | (() => string);