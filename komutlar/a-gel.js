const Discord = require('discord.js');

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['p'],
  permLevel: 0
};

exports.help = {
  name: 'gel ',
  description: 'Mesajı Gönderenin Kanalına Katılır',
  usage: 'gel'
};
