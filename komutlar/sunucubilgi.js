const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {

	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(':warning: Uyarı :warning:', '`sunucubilgi` adlı komutu özel mesajlarda kullanamazsın.')
    return message.author.send(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {      
	var sunucu = message.guild;
      const sunucubilgi = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField('Ad:', message.guild.name)
    .addField('ID', message.guild.id)
    .addField('Ana kanal:', message.guild.defaultChannel)
	.addField("Yazı Kanalları", sunucu.channels.filter(c => c.type === "text").size, true)
    .addField("Ses Kanalları", sunucu.channels.filter(c => c.type === "voice").size, true)
    .addField('Bölge', message.guild.region)
    .addField('Üye sayısı:', message.guild.memberCount)
	.addField("Çevrimiçi", sunucu.members.filter(m => m.user.presence.status === "online").size, true)
    .addField('Sahibi:', message.guild.owner + ' (' + message.guild.ownerID + ')')
    .addField('Kanal sayısı:', message.guild.channels.size)
    .addField('Oluşturulma tarihi:', message.guild.createdAt)
    return message.channel.send(sunucubilgi);
				       }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu', 'sunucu bilgi', 'sbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'sunucubilgi',
  description: 'Sunucu hakkında bilgi verir.',
  usage: 'sunucubilgi'
};
