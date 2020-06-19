	module.exports.run = async (bot, message, args) => {
     if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`:no_entry: **${message.author.username}**, you can't use that `);

    message.delete();
  let reason = args.slice(1).join(" ");
  let user = message.mentions.users.first();
  if (reason.length < 1)
    return message.reply("You should write a reason.").then(m => m.delete(3000));
  if (message.mentions.users.size < 1)
    return message
      .reply("You should mention a user")
      .catch(console.error)
      .then(m => m.delete(3000));
  if (!message.guild.member(user).bannable)
    return message.reply("I can't ban a admin.").then(m => m.delete(3000));
  var fetched = await message.channel.fetchMessages({ limit: 99 });
  if (user) {
    var fetched = fetched
      .filter(m => m.author.id === user.id)
      .array()
      .slice(0, 99);
  }
  message.channel.bulkDelete(fetched);
  message.guild.ban(user, 2);
  message.channel
    .send(
      `I deleted the last 99 messages of ${user} and banned her-him  for the \`${reason}\` reason!`
    )
    .then(m => m.delete(3000))
    .catch(error =>
      message.channel.send("Messages before 14 days are not deleted!")
    )
    .then(m => m.delete(3000));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["softban", "sb"],
  permlevel: 0
};
exports.help = {
  name: "soft-ban",
  description: "Belirttiğiniz kullanıcının önce mesajlarını siler sonra banlar.",
  usage: "softban <@kulanıcı>"
};
