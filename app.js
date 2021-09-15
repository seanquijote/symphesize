require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "-";

client.once("ready", () => {
    console.log("Symphesize is ready and online!");
});

client.on("message", message => {
    if (!message,content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
});

client.login(process.env.TOKEN);