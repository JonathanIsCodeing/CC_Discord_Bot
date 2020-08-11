const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const Narcia = require('./narcia.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('CCBot is online!')

    // Narcia trigger
    var narcia = Narcia.instance;
    console.log(narcia.startDate);
    console.log(Date.now());

    (function(){
        var message = narcia.triggerMessage;
        if (message != null){
            client.channels.fetch('742117366749724702')
            .then(channel => channel.send(message))
            .catch(console.error);
        } else {
            console.log('no event triggered');
        }

        // Call function once every 15 sec
        setTimeout(arguments.callee, 15000);
    })();
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.login(token);