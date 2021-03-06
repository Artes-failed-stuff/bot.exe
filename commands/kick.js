const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        let succesful = true;
        const args = argstring.split(" ");
        if (!args[0]) return errors.syntax;
        const user = msg.mentions.users.first();
        if (!user) return errors.syntax;
        const member = msg.guild.member(user);
        if (!member) return errors.syntax;
        member.kick(msg.author.tag).catch(() => succesful = false);
        if (succesful) msg.react("👍");
        else return errors.botperms;
    },
    help: `
    Usage: \`kick [metion of user to kick]\`.
    
    Requires kicking privilege for both the bot and whoever issues the command.
    `
}
