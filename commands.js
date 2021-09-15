const main = require("./app");
const pingHandler = require("./commands/ping");

let CommandHandler = {
    ping: async function () {
        main.client.on("message", (message) => {
            message.channel.send("PONG BAKA!");
        });
    }
}


module.exports = CommandHandler;