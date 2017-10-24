const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const YTDL = require('ytdl-core');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');

const NewRole = new Enmap({provider: new EnmapLevel({name: 'NewRole'})});
const Colour = new Enmap({provider: new EnmapLevel({name: 'Colour'})});
const GetUptime = bot => {
    return moment.duration(bot.uptime).format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]');
  };

var servers = {};
var yasin = [
    'https://imgur.com/ZtD32Sr',
    'https://imgur.com/6cbFxbM'
];
var randomColor = '#000000'.replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
var addRoleName = '';
var colour1 = 0x593001;

function memberName(message) {
    return message.guild.members.get(message.member.id).displayName;
}

function memberName1(member) {
    return member.guild.members.get(member.id).displayNames;
}

function color(member) { 
     return Colour.get(member.guild.id);
}

function newRole(member) {
    return member.guild.roles.find('name', NewRole.get(member.guild.id));
}

function newRoleName(member) {
    if (!NewRole.get(member.guild.id)) {
        NewRole.set (member.guild.id, 'Pile of Shit');
    } 
        return NewRole.get(member.guild.id);
}

function newRoleMessage(message) {
    if (!NewRole.get(message.guild.id)) {
        NewRole.set (message.guild.id, 'Pile of Shit');
    } 
        return NewRole.get(message.guild.id);
}

function RoleColour(member) {
    if (newRoleName(member).toLowerCase() === 'pile of shit') {
        Colour.set(member.guild.id, 0x593001);
    } else {
        Colour.set(member.guild.id, randomColor);
    } 
    console.log('Colour set to ' + color(member));
}

function RoleColour(message) {
    if (addRoleName.toLowerCase() === 'pile of shit') {
         colour1 = 0x593001;
    } else {
         colour1 = randomColor;
    } 
}

function play(connect, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connect.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connect, message);
        else connect.disconnect();
    });
}

bot.on('ready', function() {
    console.log('Ready');
});

bot.on('guildMemberAdd', function(member) {
    member.guild.channels.find('name','general').send(member.toString() + ', Welcome you ' + newRoleName(member) + ', type !help for a list of commands');
    console.log('Welcome message sent to ' + memberName1(member));
    newRoleName(member);
    member.addRole(newRole(member)).catch(console.error);
    console.log(memberName1(member) + ' assigned ' + newRoleName(member));

    if (!newRole(member)) {
        RoleColour(member);
        console.log('Role Colour set to: ' + color(member));
        member.guild.createRole({
            name: newRoleName(member),
            color: color(member),
            permissions:[]
        }).then(function(role) {
            member.addRole(role);
            console.log(mmemberName1(member) + ' assigned ' + newRoleName(member));
        });
        console.log('New Role, ' + newRoleName(member) + ',created with the colour,  ' + color(member) +'.');
    }
});

bot.on('message', function(message) {
if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    var args = message.content.substring(config.prefix.length).split(' ');

    switch(args[0].toLowerCase()) {
        case 'navy':
            message.channel.send('What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.');
            message.channel.send('https://www.youtube.com/watch?v=NsZMbs5PC64');
            console.log('Navy');
            break;
        case 'info':
            var embed = new Discord.RichEmbed()
                .setColor(0x0000FF)
                .addField('Name', 'NeonNukeBot')
                .addField('Purpose', 'Dankness')
                .addField('Maker', 'NeonNuke#1160')
                .addField('To add me to your server visit:', 'https://discordapp.com/oauth2/authorize?client_id=316652824106893314&scope=bot&permissions=305155072')
                .setThumbnail(bot.user.avatarURL)
            message.channel.send(embed);
            console.log('Info');
            break;
        case 'spam':
            message.channel.send('SPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAM!!!!');
            console.log('Spam');
            break;
        case 'yass':
            message.channel.send(yasin[Math.floor((Math.random() * 3)-0.0001)]);
            console.log('Yass');
            break;
        case 'yasin':
            message.channel.send(Yasin[0]);
            console.log('Yasin');
            break;
        case 'beaver':
            message.channel.send(Yasin[1]);
            console.log('Beaver');
            break;  
        case 'setrole':
            NewRole.set(message.guild.id, args[1]);
            message.reply([args]);
            message.reply(args[1] + ' is now the default role for newbs');
            console.log('Set Role ' + args[1]);
            break;
        case 'role':
            message.reply(newRoleMessage(message));
            console.log('Print Role');
            break;
        case 'removenewrole':
            message.member.removeRole(newRoleMessage(message)).catch(console.error);
            message.reply('Role Removed');
            console.log('Remove New Role');
            break;
        case 'deletenewrole':
            newRoleMessage(message).delete().catch(console.error);
            message.reply('Role Deleted');
            console.log('Deleted ' + newRoleMessage(message));
            break;
        case 'addrole':
            if (!args[1]) {
                message.reply('Please provide a role');
                console.log(memberName(message) + ' did not provide a role')
                break;
            } else {
                addRoleName = args[1]
            }
           
            if (!message.guild.roles.find('name', args[1])) {
                message.guild.createRole( {
                    name: args[1],
                    color: colour1,
                    permissions:[]
                }).then(function(role) {
                    message.member.addRole(role);
                });
                message.reply('Assigned role, ' + args[1] + ', to you');
                console.log('New Role ' + args[1] + ' ' + RoleColour(message) +', created on guild ,' + message.guild.name + ', by ' + memberName(message));  
                break;
            } else if (message.member.roles.find("name", args[1])) {
                message.reply('You already have this role');
                console.log(memberName(message) + ' already has this role, ' + args[1] + ' ' + message.guild.name);
                break;
            } else {
                message.member.addRole(message.guild.roles.find('name', args[1])).catch(console.error);
                message.reply('Role, ' + args[1] + ', added');
                console.log('Role, ' + args[1] + ', added to ' + memberName(message));
                break;
            }
        case 'deleterole':
            if (args[1]) {
                message.guild.roles.find('name', args[1]).delete().catch(console.error);
                message.reply('Role Deleted');
                console.log('Deleted Role ' + args[1]);
            } else {
                message.reply('Include a role to delete');
                console.log('Role to delete not included');
            }
            break;
        case 'removerole':
            if (args[1]) {
                if (message.members.roles.find('name', args[1])) {
                message.member.removeRole(message.members.roles.find('name', args[1])).catch(console.error);
                message.reply('Role removed');
                console.log('Removed Role ' + args[1]);
                }
            } else {
                message.reply('Include a role to remove');
                console.log('Role to remove not included')
            }
            break;
        case 'play':
            if (!args[1]) {
                    message.channel.send("Please provide a link");
                    console.log('Link needed');
                    break;
                }

            if (!message.member.voiceChannel) {
                message.channel.send("Please join a Voice Channel");
                break;
            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var repeat = parseInt(args[2])
            if ((Number.isInteger(repeat))>0) {
                message.reply('Audio added to the Queue ' + repeat + ' times! :wink:');
                while (repeat>0) {
                    server.queue.push(args[1]);
                    repeat --
                }
            } else {
                server.queue.push(args[1]);
                message.reply('Audio added to the Queue! :wink:');
            }
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connect) {
                play(connect, message);
            });
            message.delete();
            break;
        case 'skip':
            var server = servers[message.guild.id];
        
            message.channel.send("Music skipped!");
            console.log("Music skipped!");
            if (server.dispatcher) server.dispatcher.end();
            break;
        case 'stop':
            var server = servers[message.guild.id];
                
            message.channel.send("Music stopped!");
            console.log("Music stopped!");
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
        case 'pause':
            var server = servers[message.guild.id];

            message.channel.send("Music paused!");
            console.log('Music paused!');
            if (server.dispatcher) server.dispatcher.pause();
            break;
        case 'unpause':
            var server = servers[message.guild.id];

            message.channel.send("Music unpaused!");
            console.log('Music unpaused!');
            if (server.dispatcher) server.dispatcher.resume();
            break;
        case 'got':
            if (!message.member.voiceChannel) {
                return message.channel.send("Please join a Voice Channel");
            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
    
            var server = servers[message.guild.id];
            var repeat = parseInt(args[1])
            if ((Number.isInteger(repeat))>0) {
                message.reply('Game of Thrones themetune added to the Queue ' + repeat + ' times! :wink:');
                while (repeat>0) {
                    server.queue.push('https://www.youtube.com/watch?v=s7L2PVdrb_8');
                    repeat --
                }
            } else {
                server.queue.push('https://www.youtube.com/watch?v=s7L2PVdrb_8');
                message.reply("Game of Thrones themetune added to the Queue! :wink:");
            }
    
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connect) {
                play(connect, message);
            });
            message.delete();
            break;
        case 'west':
            if (!message.member.voiceChannel) {
                return message.channel.send("Please join a Voice Channel");
            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
    
            var server = servers[message.guild.id];
            var repeat = parseInt(args[1])
            if ((Number.isInteger(repeat))>0) {
                message.reply('WestWorld themetune added to the Queue ' + repeat + ' times! :wink:');
                while (repeat>0) {
                    server.queue.push('https://www.youtube.com/watch?v=rYelEUVQ50g');
                    repeat --
                }
            } else {
                server.queue.push('https://www.youtube.com/watch?v=rYelEUVQ50g');
                message.reply("WestWorld themetune added to the Queue! :wink:");
            }
    
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connect) {
                play(connect, message);
            });
            message.delete();
            break;
        case 'queue':
            var embed = new Discord.RichEmbed()
                .setColor(0x0000FF)
                .setThumbnail(bot.user.avatarURL)
            message.channel.send(embed);
            console.log('Queue printed');
        case 'stats':
            message.channel.send("'Statistics' \n 'Servers:' #" + `${bot.guilds.size}` + "\n 'Users:' #" +  `${bot.users.size}` + "\n 'Channels:' #" + `${bot.users.size}`, {code: 'cs'});
            console.log('Stats');
            break;
        case 'help':
            var embed = new Discord.RichEmbed()
                .setColor(0x0000FF)
                .addField('!Navy', 'Navy Seals Copypasta with video')
                .addField('!Spam', 'Spams Chat')
                .addField('!Yass', 'Random Yasin picture')
                .addField('!Yasin', 'Yasin picture')
                .addField('!Beaver', 'Beaver Picture')
                .addField('!Role', 'Shows role set for newbs')
                .addField('!SetRole', 'Role following command becomes role for newbs')
                .addField('!RemoveRole', 'Removes Role following command from Member')
                .addField('!DeleteRole', 'Deletes Role following command from Server')
                .addField('!AddRole', 'Adds Role following command to Member')
                .addField('!RemovenewRole', 'Removes Role for newbs from Member')
                .addField('!DeletenewRole', 'Deletes Role for newbs from Server')
                .addField('!Play', 'Plays audio from Youtube video, to repeat the audio place a number after the link')
                .addField('!Pause', 'Pauses current song')
                .addField('!Unpause', 'unpauses current song')
                .addField('Skip', 'Skip current song')
                .addField('Stop', 'Stops audio and clears queue')
                .addField('!Queue', 'Prints Queue')
                .addField('!Got', 'Plays Game of Thrones themetune, to repeat the audio place a number after the link')
                .addField('!West', 'Plays WestWorld themetune, to repeat the audio place a number after the link')
                .addField('!Info', 'Info')
                .addField('!Stats', 'View bot statistics')
                .setThumbnail(bot.user.avatarURL)
            message.channel.send(embed);
            console.log('Help');
            break;
        default:
            message.reply('Invalid command. See !help');
            console.log('Invalid Command ');
        }
});

bot.login(config.token);
