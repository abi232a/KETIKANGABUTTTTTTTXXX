const { Message, Client, MessageEmbed } = require("discord.js");
const { user, guilds } = require("../..");

module.exports = {
    name: "avatar",
    aliases: ['av'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let mentioned = message.mentions.members.first() || message.member;
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setImage(mentioned.user.displayAvatarURL( {size: 512, dynamic: true } )) 
        .setTitle( `> *AVATAR* ${mentioned.user.username}` )
        

        
        message.reply({         
            embeds: [embed]})
    }
    }