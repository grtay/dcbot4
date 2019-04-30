const Discord = require('discord.js');
const client = new Discord.Client();
const YouTube = require('simple-youtube-api');
const yt = require('ytdl-core');
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const youtube = new YouTube(ayarlar.api);
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

///////////////////////////
client.on('ready', () => {
    const girisembed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`Bot Aktif!`)
.setDescription(`Bot Başlatıldı! `)
.setFooter(``)
client.channels.get("565905401128812584").send(girisembed)
});


////////////////
client.on("guildMemberAdd", member => {

	var channel = member.guild.channels.find("name", "🤖geri-bildirim");
	if (!channel) return;

  var role = member.guild.roles.find("name", "KAYIT BEKLiYOR");
  if (!role) return;

	member.addRole(role);
	channel.send(member + "Beyler Artık " + role + " Rolü İle Aramızda");
	member.send("Aramıza hoş geldin! Artık "+role+" rolune sahipsin!");
});

client.on('guildMemberRemove',member=>{
  var channel = member.guild.channels.find("id", "565905314528886814");
  if (!channel) return channel.send('#🤖geri-bildirim Bulamıyorum :confused:');
  channel.send('Beyler, '+member+' Aramızdan Ayrıldı :runner:)
});

/////////////////
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
