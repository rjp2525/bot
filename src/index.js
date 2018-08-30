import { Client } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';

import { Logger, Stats } from './managers';
import { CommandHandler } from './handlers';

const bot = (global.bot = exports.client = new Client({ autoReconnect: true }));
const commandHandler = new CommandHandler(bot, '>');

const log = (bot.log = new Logger(bot));
log.inject();

const stats = (bot.stats = new Stats(bot));

dotenv.config({
  path: path.join(__dirname, '../', '.env'),
});

commandHandler.on('command', msg => {
  let key = `commands-${msg.author.id}-${msg.guild.id}.${msg.channel.id}`;
  stats.increment(key);

  /**
   * TODO: This needs a better system.
   *
   * Commands should have a base class then each command extends,
   * eg. class HelpCommand extends BaseCommand {} or something.
   *
   * In the mean time, the command handler class should at least
   * return the command separate from the arguments to make it a
   * little easier for comparing them.
   */
  msg.channel.send(`Total commands run (Key: \`${key}\`): ${stats.get(key)}`);
});

bot.on('ready', () => {
  // Fix mobile notifications
  bot.user.setAFK(false);

  // Set a game for the bot
  bot.user.setActivity('Swifty', { type: 'PLAYING' });

  // Set the process title
  (title => {
    process.title = title;
    process.stdout.write(`\u001B]0;${title}\u0007`);
  })(`Swifty Statistics Bot (Running as user: ${bot.user.username})`);

  // Display bot statistics
  log.char(
    '\u2799',
    `Current Statistics:
    \u2022 Bot Account:      ${bot.user.username}#${
      bot.user.discriminator
    } <ID: ${bot.user.id}>
    \u2022 Total Users:      ${bot.users.filter(user => !user.bot).size}
    \u2022 Total Bots:       ${bot.users.filter(user => user.bot).size}
    \u2022 Total Channels:   ${bot.channels.size}
    \u2022 Total Servers:    ${bot.guilds.size}`,
  );

  delete bot.user.email; // No need to store these
  delete bot.user.verified;

  log.info(`Swifty statistics bot was successfully loaded.`);
});

bot.on('message', msg => {
  // This checks if the 'msg' property wasn't sent by the bot.
  if (msg.author.id != bot.user.id) {
    commandHandler.handle(msg);
  }

  stats.increment(`messages-${bot.user.id === msg.author.id ? 'sent' : 'received'}`);

  // if !msg.guild then it's a direct message to the bot
});

bot.on('guildCreate', guild => {
  log.info(`Bot has been added to a new server: ${guild.name} (${guild.id})`);

  // Add data to a queue and upload server information
});

bot.on('error', e => {
  log.error(e);
});

bot.login(process.env.DISCORD_BOT_TOKEN).catch(e => log.severe(e));
