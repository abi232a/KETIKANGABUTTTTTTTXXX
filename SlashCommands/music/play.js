const { QueryType } = require("discord-player");
const player = require("../../client/player");
const convert = require("../utils/convert")
const track =

    module.exports = {
        name: "play",
        description: "jalankan musik",
        options: [{
            name: "judul",
            description: "judul musik",
            type: "STRING",
            required: true,
        }, ],
        run: async(client, interaction) => {
            const judul = interaction.options.getString("judul");

            if (!interaction.member.voice.channel)
                return interaction.followUp({
                    content: "tolong join channel voice terlebih dahulu!",
                });

            const searchResult = await player.search(judul, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });

            const queue = await player.createQueue(interaction.guild, {
                metadata: interaction.channel,
            });

            if (!queue.connection)
                await queue.connect(interaction.member.voice.channel);

            interaction.followUp({ content: `> **Playing** :loudspeaker:  ` });

            searchResult.playlist ?
                queue.addTracks(searchResult.tracks) :
                queue.addTrack(searchResult.tracks[0]);

            if (!queue.playing) await queue.play();
        },
    };