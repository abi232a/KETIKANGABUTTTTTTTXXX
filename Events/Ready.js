const chalk = require("chalk"); // Importing chalk from chalk
const client = require("../index"); // Importing Client from Index.js
const { dependencies } = require("../package.json"); // Requiring dependencies from package.json
const ver = dependencies["discord.js"]; // Getting the Version of Discord.js
const mongooseConnectionString = require("../json/config.json").mongooseConnectionString; // Getting the mongoose connection string
const { connect } = require('mongoose');



client.on("ready", async () => {

  const activities = [`/help, A!help || ABIFIKRI12`];
  setInterval(() => {
     let activity = activities[Math.floor(Math.random() * activities.length)];
      client.user.setActivity(`${activities}`, {
          type: "LISTENING",
          browser: "DISCORD IOS"
      })
  }, 20000)


  console.clear();
  console.log("");
  console.log(chalk.red.bold("——————————[informasi]——————————"));
  console.log(
    chalk.white(
      `${
        client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users:"
          : "User:"
      }`
    ),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white("||"),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers:" : "Server:"}`),
    chalk.red(`${client.guilds.cache.size}`)
  );
  console.log(
    chalk.white("||"),
    chalk.white(`Slash Commands:`),
  );

  console.log("");
  console.log(chalk.red.bold("——————————[stastik]——————————"));
  console.log(
    chalk.white(`run Node`),
    chalk.green(process.version),
    chalk.white("on"),
    chalk.green(`${process.platform} ${process.arch}`)
  );
  console.log(
    chalk.white("Memory:"),
    chalk.green(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`),
    chalk.white("MB")
  );
  console.log(chalk.white("Discord.js versi:"), chalk.green(ver));
  connect(mongooseConnectionString, {}).then(
  console.log(chalk.green("✅ Kamu Berhasil Masuk "), chalk.blue(`Mongoose`)))
});
