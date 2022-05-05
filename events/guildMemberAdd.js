const generateImage = require('../util/generateImage')

module.exports = {
    name: "guildMemberAdd",
    run: async (bot, member) => {
        const {client} = bot
        const img = await generateImage(member)
        member.guild.channels.cache.get('940041354388590692').send({
        content: `Hello, <@${member.id}>!\n I, ALLISTER, welcome you to the Innovation Inc. Omni Complex Communications Server!`,
        files: [img]
        })
    }
}