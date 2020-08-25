const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

const notplaying = "Nothing playing!";

const globalconfig = load("config");

let channels = {}



module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        // to prevent users from being able to start music, but not control it
        if (!globalconfig.caching) return "This command only works if command caching is enabled.";

        if (!msg.member.voice.channel) return "You need to join a voice channel to use the music command";

        const channel = msg.member.voice.channel.id;
        
        let splitargstring = argstring.split(" ");

        if (splitargstring[0] != "play" && !channels[channel]) return notplaying;

        switch (splitargstring[0]) {
            case "play":
                channels[channel] = {}

                if (msg.member.voice.channel) channels[channel].dcchannel = msg.member.voice.channel;
                let connection = await channels[channel].dcchannel.join();
                try{
                    channels[channel].dispatcher = connection.play(
                        ytdl(
                            splitargstring[1],
                            { filter: "audioonly" }
                        )
                    );
                    msg.react("👍");
                } catch (e) {
                    msg.channel.send("Please specify a youtube url 😅");
                    channels[channel].dcchannel.leave();
                }
                break;
            case "pause":
                try {
                    channels[channel].dispatcher.pause();
                    msg.react("👍");
                } catch (e) {
                    return notplaying;
                }
                break;
            case "resume":
                try {
                    channels[channel].dispatcher.resume();
                    msg.react("👍");
                } catch (e) {
                    return notplaying;
                }
                break;
            case "stop":
                try {
                    channels[channel].dispatcher.destroy();
                    msg.react("👍");
                } finally {
                    try {
                        channels[channel].dcchannel.leave();
                    } catch(e) {}
                }
                break;
            case "volume":
                try {
                    channels[channel].dispatcher.setVolume(splitargstring[1] / 100);
                    msg.react("👍");
                } catch (e) {
                    return notplaying;
                }
                break;
            default:
                return "That's not a music command!";
        }
    },
    help: `
    Usage: \`music [command]\`.
    
    Available music commands:
        play [youtube url or video id]
            Plays the track from youtube to the voice channel the user is in.
        
        pause
            Pauses the track playing in the voice channel the user is in.
        
        resume
            Resumes the track paused in the voice channel the user is in.
        
        volume [percentage]
            Sets the volume from a percentage. Raising the percentage above 100 is possible, but will decrease sound quality.
        
        stop
            Stops playback and lets the bot leave the channel it's currently in
        
    Requires command caching to be enabled by the bot sysadmin due to technical reasons.
    `
}
