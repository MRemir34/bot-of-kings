
const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

  const permError = new Discord.RichEmbed()
    .setColor('#ed455a')
      .setTitle('• Error: 01 •')
        .setDescription(`**${message.author.username}**, you can't use that.`)
    
  const userError = new Discord.RichEmbed()
    .setColor('#ed455a')
      .setTitle('• Errror: 02 •')
        .setDescription('You should write a user id = unban 453568928669630465')
  
  const userError2 = new Discord.RichEmbed()
    .setColor('#ed455a')
      .setTitle('• Error: 03 •')
        .setDescription("You can't use letter in id")
  
  const userError3 = new Discord.RichEmbed()
    .setColor('#ed455a')
      .setTitle('• Error: 04 •')
        .setDescription("This user isn't banned")
    
  const levelError = new Discord.RichEmbed()
    .setColor('#ed455a')
      .setTitle('• Error: 05 •')
        .setDescription("You can't unban a old admin")


  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send
        (permError).then
          (message.delete()).then
            (msg => msg.delete(5000));
  
  let user = args[0];
    if  (!user) return message.channel.send
          (userError).catch(console.error).then
            (message.delete()).then
              (msg => msg.delete(5000));
  
  if  (isNaN(args[0])) return message.channel.send
        (userError2).catch(console.error).then
          (message.delete()).then
            (msg => msg.delete(5000));

  if  (user.highestRole >= message.author.highestRole) return message.channel.send
          (levelError).then
            (message.delete()).then
              (msg => msg.delete(5000));
  
  
  const banList = await message.guild.fetchBans();
  
 // console.log(banList.map(s => s.users.id))
  
  if (!user.id === banList) return message.channel.send
      (userError3).then
        (message.delete()).then
          (msg => msg.delete(5000));
  
  message.guild.unban(user);
message.channel.send(`I lifted the ban on <@!${user}> `)
  
  }

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
        kategori: "Yetkili"

  };

  exports.help = {
    name: 'unban',
    description: 'İstediğiniz kişinin banını kaldırır.',
    usage: 'unban [kullanıcı] [sebep]'
  };