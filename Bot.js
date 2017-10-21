const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const YTDL = require('ytdl-core');

function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));
    server.queue.shift();
    server.dispatcher.on('end', function() {
        if (server.queue[0]) play (connection, message);
        else connection.disconnect();
        message.channel.send('Audio finished');
        console.reply('Audio finished');
    });
}

var servers = {};

bot.on('message', function(message) {
if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    var args = message.content.substring(config.prefix.length).split(' ');

    switch(args[0].toLowerCase()) {
        case 'play':
            if (!args[1]) {
                message.reply('Please provide a link');
                console.log('Link not provided');
                return;
            } 
            
            if (!message.member.voiceChannel){
                message.reply('You must be in a voice channel');
                console.log('Was not in Voice Channel');
                return;
            } 
            
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];
            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
                message.reply('Audio Playing');
                console.log('Audio Playing');
            });
            break;
        case 'skip':
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            message.reply('Audio skipped');
            console.log('Audio skipped');
            break;
        case 'stop':
            var server = servers[message.guild.id];
            if (message.guild.voiceChannel) message.guild.voiceConnection.disconnect();
            message.reply('Audio stopped');
            console.log('Audio stopped');
            break;
        }
});

bot.login(config.token);
