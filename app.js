require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";
// const fs = require("fs");
const ytSearch = require("yt-search");
const ytdl = require("ytdl-core");

const songQueue = new Map();

client.command = new Discord.Collection();

// const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     // client.commands.set(command.name, command);
// }

client.once("ready", () => {
    console.log("Symphesize is ready and online!");
});

client.on("message", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "ping":
            // client.commands.get("ping").execute(message, args);
            message.channel.send("PONG BAKA!");
            break;

        case "tron":
            message.channel.send("CHAD BLAZER!");
            break;

        case "play":
            const voiceChannel = message.member.voice.channel;

            if (!voiceChannel) {
                return message.channel.send("Wala ka sa channel amputa!");
            }

            const permissions = voiceChannel.permissionsFor(message.client.user);
            
            if (!permissions.has("CONNECT")) {
                return message.channel.send("Maling konektadong permiso!");
            }

            if (!permissions.has("SPEAK")) {
                return message.channel.send("Maling pagsasalitang permiso!");
            }

            if (!args.length) {
                return message.channel.send("Walang pangalawang argumento!");
            }

            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query);

                if (videoResult.videos.length > 1) {
                    return videoResult.videos[0];
                } else {
                    return null
                }
            }

            const video = await videoFinder(args.join(" "));

            const connection = await voiceChannel.join();

            if (!video) {
                message.channel.send("Hindi ko nahanap bro!");
            }

            const stream = ytdl(video.url, {filter: "audioonly"});
            const timer = 300000; // 5 minutes
            connection.play(stream, {seek: 0, volume: 1})
                .on("finish", () => {
                    setTimeout(function(){ 
                        voiceChannel.leave(); 
                    }, timer);
                });

            await message.reply(`:thumbsup: Playing ${video.title}`);

            break;
    
        default:
            break;
    }    
});

client.login(process.env.TOKEN);

module.exports = {
    client: client,
    prefix: prefix
};