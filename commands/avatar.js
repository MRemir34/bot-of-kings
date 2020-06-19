const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let üye = message.mentions.members.first();
  if(!üye) {
    const embed = new Discord.RichEmbed()
      .setImage(message.author.avatarURL)
   .setDescription('Your Avatar is:')
    message.channel.send(embed)
  }
  if(üye) {
    let embed = new Discord.RichEmbed()
    .setDescription(`${üye}'s avatar is:`)  
    .setImage(üye.user.avatarURL)
    message.channel.send(embed)
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pp"],
  permLevel: 0
}

exports.help = {
  name: 'avatar'
};