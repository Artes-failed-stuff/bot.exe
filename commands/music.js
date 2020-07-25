const ytdl = require('ytdl-core')

let dispatcher, lastseenchannel = null

module.exports = (msg, argstring) => { 
    let splitargstring = argstring.split(" ")
    switch (splitargstring[0]) {
        case "play":
            if (lastseenchannel == null && !msg.member.voice.channel) {
                msg.channel.send("join a channel yourself blyat")
                return
            }
            if (msg.member.voice.channel) lastseenchannel = msg.member.voice.channel
            let connection = lastseenchannel.join()
            console.log(connection)
            dispatcher = connection.play(ytdl(argstring.indexOf("youtube") < 0 ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : argstring, { filter: "audioonly" }))
            break
        case "pause":
            try{
                dispatcher.pause()
            } catch(e) { msg.channel.send("Nothing playing!") }
            break
        case "resume":
            try{
                dispatcher.resume()
            } catch(e) { msg.channel.send("Nothing playing!") }
            break
        case "stop":
            try{
                dispatcher.destroy()
                msg.channel.send("aight, imma head out")
                 lastseenchannel.leave()
            } catch(e) { msg.channel.send("Nothing playing!") }
            break
        default:
            msg.channel.send("wdym")
            break
    }

}