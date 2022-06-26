const { Client } = require("discord.js"); // Importing Client from discord.js module
const { glob } = require("glob"); // Importing Glob from glob
const { promisify } = require("util"); // Importing promisify from util
const globPromise = promisify(glob);
const chalk = require("chalk");
const config = require("../json/config.json");
const fs = require("fs")


/**
 * @param {Client} client
 */
module.exports = async (client) => {

    // Commands

    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);

        }
    });

  
  // Slash Commands Handler
  const slashCommands = [];

  const SlashCommandsFiles = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );


  SlashCommandsFiles.map(async (path) => {
    const file = require(path);
    if (!file?.name) return;
    const splitted = path.split("/");
    const dir = splitted[splitted.length - 2];
    const files = {
      dir,
      ...file,
    };
    client.SlashCommands.set(file.name, files);
    slashCommands.push(file);
  });
  client.on("ready", async () => {
    // Slash Commands for a single guild
    await client.guilds.cache
      .get(config.GUILD_ID)
      .commands.set(slashCommands)

      .then(
        console.log(
          chalk.white(`✅ Kamu Berhasil Mendaftarkan slash command`),
          chalk.red(client.SlashCommands.size),
          chalk.white("Slash Commands di "),
          chalk.red(client.guilds.cache.size),
          chalk.white(`${client.guilds.cache.size > 1 ? "Guilds" : "Guild"}`)
        )
      );

    // Slash Commands for all the guilds
    await client.application.commands.set(slashCommands).then(console.log(chalk.white(`✅ Kamu Berhasil Mendaftarkan slashcommand`), chalk.red(client.SlashCommands.size), chalk.white('SlashCommands di'), chalk.red(client.guilds.cache.size), chalk.white(`${client.guilds.cache.size > 1 ? "Guilds" : "Guild"}`)))

  });

  // Events Handler
  const eventFiles = await globPromise(`${process.cwd()}/Events/*.js`);
  eventFiles.map((value) => require(value));



  
};
