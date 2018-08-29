import EventEmitter from 'events';
import { Client, Collection } from 'discord.js';

class CommandHandler extends EventEmitter {
  bot;
  modifier = '?';

  constructor(bot, modifier) {
    super();

    this.bot = bot;
    this.modifier = modifier;
  }

  /**
   * Checks if the given message is a command.
   * @param message
   *
   * @memberof CommandHandler
   */
  check(message) {
    const commandRegex = new RegExp(`/([${this.modifier}][A-z])\w+`);
    const found = message.match(commandRegex);

    if (!found) {
      return false;
    } else if (found.length > 0) {
      return true;
    } else if (found.length < 0) {
      return false;
    } else if (found.length > 1) {
      return false;
    }

    return false;
  }

  /**
   * Handles the given message, checks if it matches a command.
   * @param message
   *
   * @memberof CommandHandler
   */
  handle(message) {
    const isCommand = this.check(message.content);

    if (!isCommand) {
      return;
    }

    this.emit('command', callback(message));
  }
}

export default CommandHandler;
