module.exports = {
	name: 'commands',
	description: 'Commands',
	execute(message) {
		message.channel.send(
            '!commands\t Information about commands \n'+
            '!info\t\t\t Information about the server \n'+
            '!ping\t\t\t Answers with Pong. \n'
            );
	},
};