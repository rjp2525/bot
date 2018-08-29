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
        var firstTwoWords = message.content.replace(/(([^\s]+\s\s*){2})(.*)/,"$1").trim();

        // Removes any punctuation.
        firstTwoWords = firstTwoWords.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

        if (firstTwoWords.toLowerCase() == 'hey swifty') {
            this.handleHeySwifty(message);
        }
    }

    /**
     * Handles actions for the 'Hey swifty' command. 
     */
    handleHeySwifty(message) {
        const msg = message.content.toLowerCase();
        // Run through all possible command scenarios
        if (msg.includes('help')) {
            message.channel.send('Here\'s a list of things I can do: **list**');
        } else {
            // If none of the commands are triggered, just show it's active:
            message.channel.send('That\'s me!');
        }
    }
}