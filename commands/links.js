const Discord = require('discord.js');

exports.run = (client, message, args) => {
   
    const embed = new Discord.RichEmbed()
     
   .addField('My Support Server ',`[Click](https://discord.gg/GSe3bBd)`, true)
    .addField('My Website',`[Click](http://www.efhmedia.ml)`, true)
     .addField('My Invite Url',`[Click](https://discord.com/api/oauth2/authorize?client_id=721636534402547843&permissions=0&redirect_uri=https%3A%2F%2Fdiscord.gg%2FY53HftC&response_type=code&scope=bot%20guilds.join)`, true)
    
    message.channel.send(embed)
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["invite-url","inviteurl","website","web-site","supprtserver","support-server","invite"],
  permLevel: 0
}

exports.help = {
  name: 'links'
};