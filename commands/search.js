const start = "http://letmegooglethat.com/?q=";

const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        msg.channel.send(
            start +
            argstring.replace(/ /g, "+")
        );
    }
}