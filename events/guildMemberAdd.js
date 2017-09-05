const settings = require('../auth.json');
module.exports = member => {
	let guild = member.guild;
	//guild.channels.get(guild.id).send(`Give ${user.username} a huge welcome to the Dauntless Unofficial Streaming Team! We can't wait to get to know you! Make sure you check out the <#342067551276236830> and <#342073542067617792> channels. Once you give us a link to your stream(s) we can add you to the bot!`);
	guild.channels.get(`${settings.logchan}`).send(`Give ${member} a huge welcome to the Dauntless Unofficial Streaming Team! We can't wait to get to know you! Make sure you check out the <#342067551276236830> and <#342073542067617792> channels. Once you give us a link to your stream(s) we can add you to the bot!`);
};
