const Discord = require('discord.js');

exports.run = (client, message, args) => {
   
    const efhmedia = new Discord.RichEmbed()
     .setTitle(`Help Menu \nMy Prefixes: ("q!")-("i.")-("!")-("!!")-("&")-(">")-(".")-("/")-("k/")`, true)
       .addField('Counter Commands',`set-counter number #channel \nreset-counter`, true)
.addField('Economy Commands',`coming soon`)
   .addField('Moderation Commands ',`ban @user reason \nforceban id \nkick @user reason \nunban id \ntempban @user \nsoftban @user \nautorole @role #channel \nmute @user 1s|1m|1h|1d \nunmute @user reason \nserver-introduce`, true)
     .addField('Music Commands',`coming soon`, true)
         .addField('Game Commands',`coming soon`, true)
     .addField('The Other Commands',`myprefix \nlinks \navatar \nbanlist `, true)

    message.channel.send(efhmedia)
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
}

exports.help = {
  name: 'help'
}; 