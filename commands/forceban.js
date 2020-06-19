
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
   if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`:no_entry: **${message.author.username}**, you can't use that `);
    if (!args[0]) {
        return message.channel.send(`:x: You should write a user id!`)
    }
    var sebeb = args.slice(1).join(" ");
    var seyfooo = args[0]
    var now = new Date()
    if (!sebeb) {
        message.guild.fetchBans()
            .then(bans => {
                if (bans.has(seyfooo)) {
                    return message.channel.send(`:x: This user already banned.`)
                }
                message.guild.ban(seyfooo, sebeb)
                    .then(async (member) => {
                        let user;
                        if (member instanceof Discord.GuildMember) {
                            user = member.user;
                        }
                        else if (member instanceof Discord.User) {
                            user = member;
                        }
                        else {
                            user = await client.fetchUser(member);
                        }
                        message.channel.send(`<@!${user.id}> banned from server`);
                    })
                    .catch(error => {
                        message.channel.send(`:x: Error`);
                        console.error(':x: Hata:', error);
                    });
            });
    } else {
        message.guild.fetchBans()
            .then(bans => {
                if (bans.has(seyfooo)) {
                    return message.channel.send(`This user already banned`)
                }
                message.guild.ban(seyfooo, sebeb)
                    .then(async (member) => {
                        let user;
                        if (member instanceof Discord.GuildMember) {
                            user = member.user;
                        }
                        else if (member instanceof Discord.User) {
                            user = member;
                        }
                        else {
                            user = await client.fetchUser(member);
                        }
                        message.channel.send(`<@!${user.id}> banned from server `);
                    })
                    .catch(error => {
                        message.channel.send(` Error`);
                        console.error(' Hata:', error);
                    });
            });
    }

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['force-ban'],
    permLevel: 0

};

exports.help = {
    name: 'forceban',
    description: 'Oylama yapmanızı sağlar.',
    usage: 'forceban <id>'
};