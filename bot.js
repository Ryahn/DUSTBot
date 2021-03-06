const Discord = require('discord.js');
const client = new Discord.Client({
	forceFetchUsers: true,
	autoReconnect: true,
	disableEveryone: true,
});
const settings = require('./auth.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

client.on('message', function (message)
{
	if (message.channel.isPrivate) {
		return;
	}
	if (message.everyoneMentioned) {
		return;
	}
	if (message.type === 'dm') {
		return;
	}
});

const log = message => {
	console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
	if (err) console.error(err);
	log(`Loading a total of ${files.length} commands.`);
	files.forEach(f => {
		let props = require(`./commands/${f}`);
		log(`Loading Command: ${props.help.name}. ✔️`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

client.reload = command => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./commands/${command}`)];
			let cmd = require(`./commands/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
			});
			client.commands.set(command, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

client.elevation = message => {
    /* This function should resolve to an ELEVATION level which
       is then sent to the command handler for verification*/
	if(!message.guild) return;
	let permlvl = 0;
	let trusted = message.guild.roles.find('name', settings.trustedrolename);
	if (trusted && message.member.roles.has(trusted.id)) permlvl = 1;
	let mod = message.guild.roles.find('name', settings.modrolename);
	if (mod && message.member.roles.has(mod.id)) permlvl = 2;
	let admin = message.guild.roles.find('name', settings.adminrolename);
	if (admin && message.member.roles.has(admin.id)) permlvl = 3;
	if (message.author.id === settings.ownerid) permlvl = 3;
	return permlvl;
};

client.login(settings.token);
