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

client.on('ready', () => {
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
})

client.login(process.env.TOKEN)