const Discord = require("discord.js");
const ms = require("ms");
exports.run = (client, message, args, func) => {
    if (!message.member.hasPermissions("BAN_MEMBERS")) return message.channel.send(`**${message.author.username}**, you can't use that`)
    let user = message.mentions.users.first();
    if (!user) return message.reply("You should meniton a user")
    let süre = args[1]
    if (!süre) return message.reply("You should write a time")
    let member = message.guild.member(user)
    if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`I can't ban a admin`)
    message.guild.ban(user, 2)
    message.channel.send(`${user} temp banned`)
    setTimeout(() => {
        message.guild.unban(user)
        message.channel.send(`${user}'s ban has expired `)
    }, ms(süre))
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['temp-ban'],
    permLevel: 0
};
exports.help = {
    name: 'tempban',
    description: 'Etiketlenen kullanıcıyı süreli olarak banlar',
    usage: 'tempban <@kullanıcı> <süre>'
};