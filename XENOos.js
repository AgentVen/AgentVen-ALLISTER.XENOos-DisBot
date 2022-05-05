const discordJS = require('discord.js')
require('dotenv').config()

const generateImage = require('./generateImage')

const client = new discordJS.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: ">>",
    owners: ['504428879205761047']
}

client.commands = new discordJS.Collection()
client.events = new discordJS.Collection()

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload)
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

/* client.on('ready', () => {
    console.log(`<ALLISTER.XENOos> Logged in as Client: ${client.user.tag}`)
})

client.on('messageCreate', (message) => {
    if (message.content == "Ping?"){
        message.reply("Pong!")
    }
})

const welcomeChannelId = '940041354388590692'

client.on('guildMemberAdd', async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `Hello, <@${member.id}>!\n I, ALLISTER, welcome you to the Innovation Inc. Omni Complex Communications Server!`,
        files: [img]
    })
}) */

client.login(process.env.TOKEN)