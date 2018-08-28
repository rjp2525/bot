import { Client, Collection } from 'discord.js';

export class MessageHandler {

    bot;
    constructor(bot) {
        this.bot = bot
    }

    /**
     * We can use the message to decide which action to take.
     */
    handle(message) {
        // Check the different possible commands and decide our course of action:

        // Check if the message starts with 'Hey swifty'
        // Takes the first two words and drops the ', ' that is appended at the end.
        const firstTwoWords = message.content.replace(/(([^\s]+\s\s*){2})(.*)/,"$1").slice(0, -2);
        if (firstTwoWords.toLowerCase() == 'hey swifty') {
            this.handleHeySwifty(message);
        }

        console.log(firstTwoWords);
        console.log(this.bot.user.id);
    }

    /**
     * Handles actions for the 'Hey swifty' command. 
     */
    handleHeySwifty(message) {
        message.channel.send('That\'s me!');
    }
}