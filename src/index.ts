require('dotenv').config();
import "reflect-metadata";

import container from './inversify.config';
import { TYPES } from "./types";
import { Bot } from "./bot";

let bot = container.get<Bot>(TYPES.Bot);

bot.listen()
    .then(() => {
        console.log("Logged In.");
    })
    .catch((e) => {
        console.log("Oh no! ", e);
    })