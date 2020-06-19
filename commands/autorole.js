
const fs = require ('fs')
const Discord = require('discord.js')
var sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("././otorol.json", "utf8"));


exports.run = async (bot, message, args) =>

{
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}, you can't use that.**`);

  
  	let profil = JSON.parse(fs.readFileSync("././otorol.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  if (!mentionedChannel && args[0] !== "reset") return message.channel.send("You should mention a role. \nDon't forget to activate the role labeling option if you can't label the role \Usage : q!autorole @role #channel");
  if (message.guild.member(message.author.id).hasPermission(0x8))

    {
      var mentionedRole = message.mentions.roles.first();
      if (!mentionedRole) return message.channel.send("**Usage = q!autorole @<rolename> #<channelname>**".then(msg => msg.delete(5000)));


	if(!profil[message.guild.id]){

		profil[message.guild.id] = {

			sayi: mentionedRole.id,
      kanal: mentionedChannel.id
		};
	}

	profil[message.guild.id].sayi = mentionedRole.id
  profil[message.guild.id].kanal = mentionedChannel.id

	fs.writeFile("././otorol.json", JSON.stringify(profil), (err) => {
		console.log(err)

	})

	const embed = new Discord.RichEmbed()
		.setDescription(`:white_check_mark: Autorole is set to ${args[0]}! \nAutorole Log channel is set to ${mentionedChannel}.`)
		.setColor("RANDOM")
		.setTimestamp()
	message.channel.send({embed})
}

}



exports.conf =
{
  enabled: true,
  guildOnly: true,
  aliases: ["setautorole", "auto-role"]
}

exports.help =
{
  name: 'autorole',
  description: 'Sunucuya Girenlere Verilecek Olan Otorolü Ayarlar.',
  usage: 'otorol'
}
