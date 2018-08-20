import { Client } from 'discord.js';

const client = new Client();
const env =
  process.env.NODE_ENV === 'development' ? path.resolve('./env.json') : '';
const { token } = env;

client.on('ready', () => {
  console.log(`> Client ${client.user.username} has been logged in.`);
});

client.on('guildCreate', guild => {
  console.log(`> Bot has been added to server: ${guild.name}`);
});

client.login(token);
