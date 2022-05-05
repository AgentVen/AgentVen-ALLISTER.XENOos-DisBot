const Canvas = require('canvas')
const discordJS = require('discord.js')

//NOTE: When updating this, use the Elemator thing to try and get a perfic 1920x1080.
//      Also note to change the these settings to work.

// Located at: https://imgur.com/a/NsTWrgl
const background = "https://imgur.com/eeYscKQ.png"
const overlay = "https://imgur.com/bt2J53O.png"

const dim = {
    height: 621,
    width: 1188,
    margin: 50
}

const av = {
    size: 256,
    x: 15.87,
    y: 38.55
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext('2d')

    // Draw in the Background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    // Draw in the Overlay
    const overimg = await Canvas.loadImage(overlay)
    ctx.drawImage(overimg, 0, 0)

    // Draw Avatar
    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    // Write in Text
    ctx.fillStyle = "white"
    ctx.textAlign = "left"

    // Draw in the Username
    ctx.font = "36px Oxanium Medium"
    ctx.fillText(username + '#' + discrim, 300, 172)

    // Draw in the Username's Underline
    /*Beacuse there seems to be no posibible way to include an underline as part of the text*/

    const attachment = new discordJS.MessageAttachment(canvas.toBuffer(), "IIOC-CS_welcome.png")
    return attachment
}

module.exports = generateImage