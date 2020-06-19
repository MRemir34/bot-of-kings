
const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')
 
exports.run = async (client, message, args) => {
        if(!args[0]) {
                const embed = new Discord.RichEmbed()
                        .setDescription(`You should write a number!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                message.channel.send({embed})
                return
  }
 
        let profil = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  const s1 = new Discord.RichEmbed()
  .setDescription('You should mention a channel!')
  .setColor("RANDOM")
                        .setTimestamp()
  if (!mentionedChannel && args[0] !== "reset") return message.channel.send(s1);
 
 
        if(args[0] === "reset") {
                if(!profil[message.guild.id]) {
                        const embed = new Discord.RichEmbed()
                                .setDescription(`You have to set it before you reset!`)
                                .setColor("RANDOM")
                                .setTimestamp()
                        message.channel.send({embed})
                        return
                }
                delete profil[message.guild.id]
                fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
                        console.log(err)
                })
                const embed = new Discord.RichEmbed()
                        .setDescription(`Counter is reseted!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        if(isNaN(args[0])) {
                const embed = new Discord.RichEmbed()
                        .setDescription(`You should write a number!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        if(args[0] <= message.guild.memberCount) {
                const embed = new Discord.RichEmbed()
                        .setDescription(`Number of people on the server is [${message.guild.memberCount}], specify a higher number!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        if(!profil[message.guild.id]){
                profil[message.guild.id] = {
                        sayi: args[0],
      kanal: mentionedChannel.id
                };
        }
       
        profil[message.guild.id].sayi = args[0]
  profil[message.guild.id].kanal = mentionedChannel.id
       
        fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
                console.log(err)
        })
 
        const embed = new Discord.RichEmbed()
                .setDescription(`Counter set to \`${args[0]}\`, counter channel is set as ${mentionedChannel}!`)
                
                .setColor("RANDOM")
                .setTimestamp()
        message.channel.send({embed})
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['set-counter'],
        permLevel: 2,
        kategori: "moderasyon"
}
 
exports.help = {
        name: 'setcounter',
        description: 'Sayaç, ayarlar!',
        usage: 'sayaç-ayarla [sayı/sıfırla] [kanal]'
}
   