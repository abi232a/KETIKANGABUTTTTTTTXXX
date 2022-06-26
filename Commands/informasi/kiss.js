

module.exports = {
    name: "kiss",
    aliases: ['ks'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let data = await Guild.findOne({
            guildID: message.guild.id
        });
        let channel =  message.mentions.channels.first();
        if(!channel) return message.channel.send("Please Provide a channel");
        let e = new MessageEmbed()
        .setDescription(`Successfully set welcome channel at ${channel}`)
        .setTimestamp(new Date())
        .setColor("AQUA")
        message.channel.send({embed: e});
        data.welcomeChannel = channel; data.save();
    }}