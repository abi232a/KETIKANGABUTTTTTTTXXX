const client = require('../index')
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
      if (message.guild) {
  
              client.util.handleTalk(message);
      }
  } )