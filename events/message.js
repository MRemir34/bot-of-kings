const Discord = require('discord.js')

module.exports = async message => {
  
  let client = message.client;
  if (message.author.bot) return;
  let prefix = client.ayarlar.prefix;
 let prefixes = ["PREFIX_1", "PREFIX_2"];//ek prefixler ana prefixinizi yazmayı unutmayın yoksa çalışmaz!!
    
    for (var i = 0; i < prefixes.length; i++) {
      if (message.content.startsWith(prefixes[i])) prefix = prefixes[i];
    }
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
