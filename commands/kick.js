

const Discord = require('discord.js');
exports.run = (client, message, args) => {
   if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`:no_entry: **${message.author.username}**, you can't use that `);
    
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':x: Uyarı :x:', '`kick` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'mod-log');
  if (!modlog) return message.reply('I cant find **mod-log** channel.');
  if (reason.length < 1) return message.reply('You should write a **reason**!');
  if (message.mentions.users.size < 1) return message.reply('You should mention a **user**.').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('I cant **ban a admin**');
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor('random')
    .setTimestamp()
    .addField('Activity:', 'Kick')
    .addField('Banned user:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Admin:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  return guild.channels.get(modlog.id).send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'kick [kullanıcı] [sebep]'
};