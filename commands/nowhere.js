const path = require("path");

const cwd = process.cwd();



const globalconfig = load("config");
const servers = load("servers");

const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        if (!msg.member.permissions.has("KICK_MEMBERS") && !globalconfig.sysadmins.includes(msg.author.id)) {
            msg.channel.send("This command requires administrator privileges.");
            return;
        }
        
        servers[msg.guild.id].allowed_channels = [];
        save("servers", servers);
        msg.react("👍");
        return servers;
    }
}