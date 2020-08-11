module.exports = {
	name: 'register-narcia',
	description: 'Narcia registration',
	execute(message, args) {
        if(args == null){
            message.channel.send('Please provide the date as an argument: YYYY-MM-DD');
        }
        var date = new Date(args[0]);
        registerNarcia(message, date);

		message.channel.send('Registration done');
	},
};