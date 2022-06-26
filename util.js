const request = require('node-fetch');
const {
    URL,
    URLSearchParams
} = require('url');
const {
    chat
} = require('./json/config.json');
const mainURL = new URL(chat.url);
const urlOptions = {
    bid: chat.brainID,
    key: chat.key,
    uid: null,
    msg: null
};

const handleTalk = async (msg) => {
    msg.content = msg.content.replace(/^<@!?[0-9]{1,20}> ?/i, '');
    if (msg.content.length < 2 || (!isNaN(chat.channel) && chat.channel != msg.channel.id)) return;
    msg.channel.sendTyping();
    urlOptions.uid = msg.author.id;
    urlOptions.msg = msg.content;
    mainURL.search = new URLSearchParams(urlOptions).toString();
    try {
        let reply = await request(mainURL);
        if (reply) {
            reply = await reply.json();
            msg.reply({
                content: reply.cnt,
                allowedMentions: {
                    repliedUser: true
                }
            })
        }
    } catch (e) {
        console.log(e.stack);
    }
};

module.exports = {
    handleTalk
};
