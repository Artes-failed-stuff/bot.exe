const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => "***" + argstring.toUpperCase().split("").join(" ") + "***",
    help: `
    Usage: \`scream [text]\`.
    
    Returns the given text but stylized ***L I K E   T H I S***.
    `
}
