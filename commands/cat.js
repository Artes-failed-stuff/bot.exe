const fs = require("fs");

const catdir = "./assets/cats/"

module.exports = async (msg, argstring, config) => {
    const cats = fs.readdirSync(catdir);
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const catfilepath = catdir + cat;

    msg.channel.send({files: [catfilepath]});
};