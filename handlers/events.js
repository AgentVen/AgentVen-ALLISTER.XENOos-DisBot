const { getfiles } = require('../util/functions')


module.exports = (bot, reload) => {
    const {client} = bot

    let events = getfiles('./events/', '.js')

    if (events.length === 0){
        console.log("Unable to load Events: 0 files ending in <.js> found in the <events> folder.")
    }

    events.forEach((f, i) => {
        if (reload)
            delete require.cache[require.resolve(`../events/${f}`)]
        const event = require(`../events/${f}`)
        client.events.set(event.name, event)

        if (!reload)
            console.log(`[${i + 1}] Event: <${f}> Loaded`)

    })

    if (!reload)
        initEvents(bot)
}

function triggerEventHandler(bot, event, ...args){
    const {client} = bot

    try {
        if (client.events.has(event))
            client.events.get(event).run(bot, ...args)
        else
            throw new Error(`Attempted to get an Event called: <${event}, but it has ceased to from exist.>`)
    }
    catch(err){
        console.error(err)
    }
}

function initEvents (bot) {
    const {client} = bot;

    client.events.forEach((e) => {
        client.on(e.name, (...args) => {
            triggerEventHandler(bot, e.name, ...args);
        })
    })
}