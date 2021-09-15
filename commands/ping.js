module.exports = {
    name: "ping",
    description: "Check if the bot is alive",
    execute(message, args) {
        message.channel.send("PONG BAKA!");
    }
}