const Discord = require('discord.js');

exports.run = (client, message, args) => {
   
    const embed = new Discord.RichEmbed()
     
   .addField('My Prefixes:',`("q!")-("i.")-("!")-("!!")-("&")-(">")-(".")-("/")-("k/")`)
    message.channel.send(embed)
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mp"],
  permLevel: 0
}

exports.help = {
  name: 'myprefixes'
};