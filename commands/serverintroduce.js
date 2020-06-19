const Discord = require('discord.js')
const fs = require('fs');
const ms = require("ms")
const db = require('quick.db')
exports.run = async (client, message, args) => {
  	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(':warning: ERROR :warning:', 'YOU CANT USE THIS COMMAND HERE')
    return message.author.sendEmbed(ozelmesajuyari); }
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`**${message.author.username}**, you can't use that`)
    let kullanildii = JSON.parse(fs.readFileSync('./sunucutanıt.json', 'utf8'));
  if (!kullanildii[message.guild.id]) kullanildii[message.guild.id] = {
    gunlukkullanim: 0
  }
  if (kullanildii[message.guild.id].gunlukkullanim == 0)
  {
        const embed = new Discord.RichEmbed()
  .setTitle('Successful')
  .setDescription('The server was introduce [Here](https://discord.gg/gQuJHPj)! \n\n You can introduce you server 12 hour after. \n\n Do you want to promote your server?[Click Me :D](https://discord.com/api/oauth2/authorize?client_id=721636534402547843&permissions=2146958847&redirect_uri=https%3A%2F%2Fdiscord.gg%2FuPVYZAm&response_type=code&scope=bot%20guilds)')
  .setColor('GREEN')
 message.channel.sendEmbed(embed);
    message.channel.createInvite({maxAge: 0}).then((invite) => {
        const embed = new Discord.RichEmbed()
            .addField(`Admin`, message.author.tag, true)
            .addField(`Server Name`, message.guild.name, true)
      .addField(`Members`, message.guild.members.size, true)
      .addField(`Invite Url`, `[Click](${invite.url})`, true)
        .addField(`Add Me`,`[Click](https://discord.com/api/oauth2/authorize?client_id=721636534402547843&permissions=0&redirect_uri=https%3A%2F%2Fdiscord.gg%2FY53HftC&response_type=code&scope=bot%20guilds.join)`, true)
            .setColor('RANDOM')
      .setThumbnail(message.guild.iconURL)
       client.channels.get('722437093451890769').send(embed)
            });
  kullanildii[message.guild.id].gunlukkullanim = 1
    
  fs.writeFile('./sunucutanıt.json', JSON.stringify(kullanildii), (err) => {
      if (err) console.error(err)
    })
  return
  }
  setTimeout(async() => {
    kullanildii[message.guild.id].gunlukkullanim = 0
    fs.writeFile('./sunucutanıt.json', JSON.stringify(kullanildii), (err) => {
      if (err) console.error(err)
    })
  }, ms('12h'));
  
  if (kullanildii[message.guild.id].gunlukkullanim == 1)
  {
  message.channel.send({embed: {
      description: '**Error** \n\nThis command already used! You can use this command 1 time in 12 hours. \n\n[Add Me](https://discord.com/api/oauth2/authorize?client_id=721636534402547843&permissions=0&redirect_uri=https%3A%2F%2Fdiscord.gg%2FY53HftC&response_type=code&scope=bot%20guilds.join)'
            }});
  }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['server-introduce'],
    permLevel: 0,
}
exports.help = {
    name: 'serverintroduce',
    description: 'Sunuzunuzu Tanıtmak İçin En Uygun Kod!',
    usage: 'sunucutanıt'
}