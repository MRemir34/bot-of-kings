const Discord = require("discord.js")
const ms = require("ms")

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermissions ('BAN_MEMBERS')) return message.channel.send(`**${message.author.username}**, you can't use that`)
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor("Error").setDescription(`I can't find this user(<@${user.id}>)`))
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!user.roles.find(`name`, "Muted")) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setTitle(`User isn't muted [Mute role == Muted(red)]`))
    if (!reason) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor("Error").setDescription(`You should write a reason`))
    let muterole = message.guild.roles.find(`name`, "Muted");

    if (!muterole) {
        try {
           muterole = await message.guild.createRole({
                name: "Muted",
                color: "#f4424b",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
  


     await (user.removeRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor('Activity: Unmute')
            .addField('User', `<@${user.id}>`)
            .addField('Reason', `${reason}`)
            .addField('Moderator', `${mod}`)
            .setColor('RANDOM')
        message.channel.send(muteembed)
}


exports.conf = {
    aliases: ["un-mute"],
    permLevel: 2
};

exports.help = {
    name: "unmute",
    description: "Etiketlenen Kişinin Mutesini Geri Alır",
    usage:  "unmute [kullanıcı] [sebep]",
}