
const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (client, message, args) => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
        if(!sayac[message.guild.id]) {
            const embed = new Discord.RichEmbed()
                .setDescription(`The counter cannot be reset because it is not set!`)
       
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            return
        }
        delete sayac[message.guild.id]
        fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
            console.log(err)
        })
        const embed = new Discord.RichEmbed()
            .setDescription(`Counter reseted!`)
     
            .setColor("RANDOM")
            .setTimestamp()
        message.channel.send({embed})
        return
    }

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['resetcounter'],
  permLevel: 0
};

exports.help = {
  name: 'reset-counter', 
  description: 'Sayaçı, sıfırlar!',
  usage: 'sayaç-sıfırla'
};
   