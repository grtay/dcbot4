const Discord = require('discord.js');

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['p'],
  permLevel: 0
};

exports.help = {
  name: 'git ',
  description: 'Mesajı gönderenin kanalından ayrılır',
  usage: 'git'
};
