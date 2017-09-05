const url = require('url');
exports.run = (client, message, params) => {
    let platform = params[0];
    let urldata = url.parse(params[1], true);
    let data = urldata.host.split('.')[1]+"."+urldata.host.split('.')[2];
	//message.channel.send(`${message.author}, Your request has been submited with the following: ${platform} ${url}`);
	message.channel.send(`${data}`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'verify',
	description: 'Ping/Pong command. I wonder what this does? /sarcasm',
	usage: 'verify'
};
