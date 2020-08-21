const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

const globalconfig = load("config");
const servers = load("servers");

const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        if (!msg.member.permissions.has("KICK_MEMBERS") && !globalconfig.sysadmins.includes(msg.author.id)) {
            msg.channel.send("This command requires administrator privileges.");
            return;
        }
        
        if (!servers[msg.guild.id].allowed_channels.includes(msg.channel.id)) {
            servers[msg.guild.id].allowed_channels.push(msg.channel.id);
        } else {
            msg.channel.send("Already allowed here.");
        }

        save("servers", servers);
        msg.react("👍");
        return servers;
    }
}