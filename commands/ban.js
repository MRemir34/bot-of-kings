const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`:no_entry: **${message.author.username}**, you can't use that `);

  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':x: Uyarı :x:', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'mod-log');
  if (!modlog) return message.reply("I can't find **mod-log** channel.");
  if (reason.length < 1) return message.reply('You should write a **reason**!');
  if (message.mentions.users.size < 1) return message.reply('You should mention a **user**').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply(" I can't **ban a admin**");
  message.guild.ban(user, 2);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Activity:', 'Ban :bangbang: ')
    .addField('Banned User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Admin:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  return guild.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban [kullanıcı] [sebep]'
};
