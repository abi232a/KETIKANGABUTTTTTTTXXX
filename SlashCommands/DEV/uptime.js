const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');
const {
    Client,
    CommandInteraction,
    MessageEmbed,
    GuildMember,
    version
} = require('discord.js');

module.exports = {
    name: "uptime",
    description: "uptime",

     run: async (client, interaction) => {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        const cpu = await si.cpu();
        let mcount = 0;


        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription(`**UPTIME**:
> **• Day**   :  ${days}  
> **• Hour**  : ${hours}  
> **• Minute**:  ${minutes}  
> **• Second**: ${seconds}  
> **• Users** : ${mcount}

**SYSTEM**
> **• Platfrom** : ${os.type}

**CPU**
> **• Model** : ${os.cpus()[0].model} 
> **• Speed** : ${os.cpus()[0].speed} MHz
> **• Cores** : ${cpu.cores}${os.hostname}

**MEMORY **:
> **• Total Memory** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
> **• Free Memory** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Total** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Usage** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
    `)


        interaction.followUp({
            embeds: [embed]
        });
    }
}