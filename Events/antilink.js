const client = require('../index')
var pub = 'discord.gg/' || 'discordapp.com/invite/'||'https://'||'http://' || 'discord.com/invite/' || 'cok.code'
client.on('messageCreate', (message) => {


  const { MessageEmbed } = require('discord.js')
  const embed = new MessageEmbed()
  .setDescription(`Dilarang Share Link!`)
  .setColor("RED")
  .setImage("https://th.bing.com/th/id/OIP.pYHKGGiu1gNbpXwap0vzSwHaD3?w=334&h=180&c=7&r=0&o=5&pid=1.7")
  .setTitle("PERINGATAN")
  .setTimestamp()


  if (message.content.includes(pub)) {
    message.delete()
    message.channel.send({ embeds: [embed]}

      

    )
}
}

  )