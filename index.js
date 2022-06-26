const { Collection, Client, Intents } = require("discord.js");

const Enmap = require("enmap");


const client = new Client({ 
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER', 'REACTION', 'GUILD_SCHEDULED_EVENT', 'MESSAGE_CREATE'],
  intents: [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_TYPING',
    'GUILD_BANS',
    'GUILD_EMOJIS_AND_STICKERS',
    'GUILD_INTEGRATIONS',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_PRESENCES',
    
      ] , 
  ws: { properties: { $browser: "Discord iOS" } }
  
})



module.exports = client;
client.SlashCommands = new Collection();
client.interactions = new Collection();
client.commands = new Collection();
client.config = require("./json/config.json")



client.on('disconnect', () => {
  console.warn('Disconnected!')
  process.exit(0);
});

client.util = require('./util');

["handler"]
    .filter(Boolean)
    .forEach(h => {
        require(`./handler/${h}`)(client);

    })






client.login(client.config.token);