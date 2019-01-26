const Discord = require('discord.js');

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['p'],
  permLevel: 0
};

exports.help = {
  name: 'ekle ',
  description: 'Link/Şarkı adı ile sıraya şarkı ekler',
  usage: 'ekle'
};
