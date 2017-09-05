const settings = require('../auth.json');
module.exports = (guild, user) => {
	guild.channels.get(`${settings.adminchan}`).sendMessage(`${user.username} was just banned!`);
};
