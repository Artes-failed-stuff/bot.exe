const ytdl = require("ytdl-core");
const fs = require("fs");

const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (argstring == "") return errors.syntax;

        const file = path.join("temp", argstring.substr(-11) + ".mp3");
        ytdl(argstring, { filter: "audioonly" }).pipe(fs.createWriteStream(file)).on("finish", async () => {
            await msg.channel.send({files: [file]}).catch((e) => {
                return "File too large for Discord!";
            });
            await fs.promises.unlink(file);
        });
    },
    help: `
    Usage: \`ytdl [youtube url/video id]\`.
    
    Returns an mp3 file with the audio of the given youtube video. Will not work on longer tracks thanks do the discord 8mb file size limit.
    `
}
