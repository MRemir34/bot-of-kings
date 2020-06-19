
const Discord = require("discord.js");
const ms = require("ms");



var mutelirolu = "Muted" //MUTELENDİGİ ZAMAN VERİLECEK ROLU  BURAYA YAZINIZ...

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermissions ('BAN_MEMBERS')) return message.channel.send(`**${message.author.username}**, you can't use that`)

  let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mutekisi) return message.reply(`:warning: You should mention a user! \nUsage: \`q!mute <@user> <1s/1m/1h/1d>\``)
  if(mutekisi.hasPermission("MANAGE_MESSAGES")) return message.reply(`:warning: I can't mute a admin! \nUsage: \`q!mute <@User> <1s/1m/1h/1d>\``)
  let muterol = message.guild.roles.find(`name`, mutelirolu);
  if(!muterol){
    try{
      muterol = await message.guild.createRole({
        name: mutelirolu,
        color: "#f4424b",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
  .replace(`sn`, `s`)
  .replace(`dk`, `m`)
  .replace(`sa`, `h`)
  .replace(`g`, `d`)

  if(!mutezaman) return message.reply(`:warning: You should write a mute time! \nUsage: \`q!mute <@user> <1s/1m/1h/1d>\``)

  await(mutekisi.addRole(muterol.id));
  message.reply(`The user of <@${mutekisi.id}> was muted ${args[1]}!`);

  setTimeout(function(){
    mutekisi.removeRole(muterol.id);
    message.channel.send(`<@${mutekisi.id}>'s mute time has ended'!`);
  }, ms(mutezaman));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "mute",
    description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
    usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
  };