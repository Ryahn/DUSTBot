const settings = require('../auth.json');
module.exports = member => {
	let guild = member.guild;
	guild.channels.get(`${settings.logchan}`).send(`${member.user.username} has left the server`);
};
