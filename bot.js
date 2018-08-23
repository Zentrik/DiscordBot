const Discord = require('discord.js');
const client = new Discord.Client();
var async = require('async');
const config = require("./config.json");
const fs = require('fs');
const readline = require('readline');
const YTDL = require('ytdl-core');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const moment = require('moment');
require('moment-duration-format');
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const tokenPath = './youtubeCredentials.json';
const tokenDir = './';
const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];
const cheerio = require('cheerio'),
      snekfetch = require('snekfetch'),
      querystring = require('querystring');

const settings = new Enmap({
  provider: new EnmapLevel({
    name: 'settings'
  })
});
const defaultSettings = {
  modLog: "modlogs",
  caseId: 0,
  memberLog: "memberlogs",
  prefix: "n!"
}

const GetUptime = client => {
  return moment.duration(client.uptime).format('d:hh:mm', {
    trim: false
  });
};
const Unit = ['', 'K', 'M', 'G', 'T', 'P'];
const BytesToSize = (input, precision) => {
  let index = Math.floor(Math.log(input) / Math.log(1024));
  if (Unit >= Unit.length) return input + ' B';
  return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + Unit[index] + 'B';
};

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

var servers = {};

var navy = 'What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.';

function randomColor(){
  var c = '';
  while (c.length < 6) {
    c += (Math.random()).toString(16).substr(-6).substr(-1)
  }
  return '#'+c;
}

function play(connection, message) {
  var server = servers[message.guild.id];
  server.dispatcher = connection.play(YTDL(server.queue[0], {
    filter: "audioonly"
  }));
  server.dispatcher.on("end", function() {
    server.queue.shift();
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

function addAudio(message, repeat, url, title, thumbnail, channelTitle) {
  var server = servers[message.guild.id];
  if ((Number.isInteger(repeat)) > 0) {
    var embed = new Discord.MessageEmbed()
      .setColor(0x0000FF)
      .setThumbnail(thumbnail)
      .addField(title, channelTitle)
      .addField('Added', repeat + ' times')
    message.channel.send(embed);
    while (repeat > 0) {
      server.queue.push(url);
      repeat--;
    }
  } else {
    server.queue.push(url);
    var embed = new Discord.MessageEmbed()
      .setColor(0x0000FF)
      .setThumbnail(thumbnail)
      .addField(title, channelTitle)
    message.channel.send(embed);
  }
  if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
    play(connection, message);
  });
  message.delete();
}

function memberkick(member) {
  var i = settings.get(member.guild.id).caseId;
  member.guild.fetchAuditLogs({type: 20, limit: 1}).then(auditlog => {
    var embed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle(auditlog.entries.first().executor.displayAvatarURL() + ' ' + auditlog.entries.first().executor.tag)
      .addField('Member:', member.displayName + member.user.discriminator + ' (' + member.id + ')')
      .addField('Action: ', 'Kick')
      .addField('Reason:', auditlog.entries.first().reason)
      .setFooter('Case ' + String(i))
       .setTimestamp(auditlog.entries.first().createdTimestamp)
    guild.channels.find('name', settings.get(member.guild.id).modLog).send(embed);
  }).catch(console.error);
}

function bannadd(guild, user) {
  var i = settings.get(member.guild.id).caseId;
  guild.fetchAuditLogs({type: 22, limit: 1}).then(auditlog => {
    var embed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle(auditlog.entries.first().executor.displayAvatarURL() + ' ' + auditlog.entries.first().executor.tag)
      .addField('Member:', user.username + ' (' + user.id + ')')
      .addField('Action: ', 'Ban')
      .addField('Reason:', auditlog.entries.first().reason)
      .setFooter('Case ' + String(i))
      .setTimestamp(auditlog.entries.first().createdTimestamp)
    guild.channels.find('name', settings.get(guild.id).modLog).send(embed);
  }).catch(console.error);

}

function memberremove(member) {
  var embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle(member.displayName + member.user.discriminator + ' (' + member.id + ')')
    .setFooter('User left', member.user.displayAvatarURL())
    .setTimestamp()
  member.guild.channels.find('name', settings.get(member.guild.id).memberLog).send(embed);
}

function memberadd(member) {
  var embed = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(member.displayName + member.user.discriminator + ' (' + member.id + ')')
    .setFooter('User joined', member.user.displayAvatarURL())
    .setTimestamp(member.joinedAt)
  member.guild.channels.find('name', settings.get(member.guild.id).memberLog).send(embed);
}

function prefix(message) {
  if (message.guild === null) {
    return;
  }
  if (!settings.get(message.guild.id)) settings.set(message.guild.id, defaultSettings);
  return settings.get(message.guild.id).prefix;
}

client.on('ready', ()=> {
  client.user.setPresence({activi: { name: 'n!help | ' + `${client.guilds.size}` + ' servers'}});
  console.log('Ready');
});

client.on("guildCreate", guild => {
  settings.set(guild.id, defaultSettings);
});
client.on("guildDelete", guild => {
  settings.delete(guild.id);
});

client.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`));

client.on('guildMemberAdd', member => {
  if (!member.guild.me.hasPermission('MANAGE_CHANNELS')) {
    member.guild.channels.find('id', member.guild.channels.firstKey()).send('Please, may I have the manage channels permission so that I can log');
    return;
  }
  if (!member.guild.channels.find('name', settings.get(member.guild.id).memberLog)) {
    member.guild.channels.create(settings.get(member.guild.id).memberLog).then(function(send) {
      memberadd(member);
    }).catch(console.error);
  } else {
    memberadd(member);
  }
});

client.on('guildMemberRemove', member => {
  if (!member.guild.me.hasPermission('MANAGE_CHANNELS')) {
    member.guild.channels.find('id', member.guild.channels.firstKey()).send('Please, may I have the manage channels permission so that I can log');
    return;
  }
  member.guild.fetchAuditLogs({limit: 1}).then(auditlog => {
      if (auditlog.entries.first().target.id == member.id) {
        if (auditlog.entries.first().action == 'MEMBER_KICK') {
          console.log('ayy');
          if (!member.guild.channels.find('name', settings.get(member.guild.id).memberLog)) {
            member.guild.channels.create(settings.get(member.guild.id).memberLog).then(function(send) {
              memberkick(member);;
            }).catch(console.error);
          } else {
            memberkick(member);;
          }
        } else if (auditlog.entries.first().action == 'MEMBER_BAN_ADD') {
          return;
        }
      }
  }).catch(console.error);

  if (!member.guild.channels.find('name', settings.get(member.guild.id).memberLog)) {
    member.guild.channels.create(settings.get(member.guild.id).memberLog).then(function(send) {
      memberremove(member);
    }).catch(console.error);
  } else {
    memberremove(member);
  }
});

client.on('guildBanAdd', (guild, user) => {
  if (!guild.me.hasPermission('MANAGE_CHANNELS')) {
    guild.channels.find('id', guild.channels.firstKey()).send('Please, may I have the manage channels permission so that I can log');
    return;
  }
  if (!guild.channels.find('name', settings.get(guild.id).modLog)) {
    guild.channels.create(settings.get(guild.id).modLog).then(function(send) {
      bannadd(guild, user);
    }).catch(console.error);
  } else {
    bannadd(guild, user)
  }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix(message)) || message.author.bot) return;

  var args = message.content.substring(prefix(message).length).split(/ +/);
  var argsrole = [].slice.call(args).splice(1,args.length).join(' ');
  var argslast = parseInt(args[args.length - 1])
  if (Number.isInteger(argslast)) {
    var argssearch = [].slice.call(args).splice(1, args.length - 2).join(' ');
  } else {
    var argssearch = [].slice.call(args).splice(1, args.length - 1).join(' ');
  }
  if (args[0].startsWith('eval')) {
    if(message.author.id != config.ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
      return;
    }

  switch (args[0].toLowerCase()) {
    case 'ban':
      if (message.mentions.members.first() === undefined) {
        message.delete;
        message.reply('Please specify a user to kick with a mention')
        break;
      }
      var role = message.member.roles.color;
      if (role == null && !message.guild.ownerID == message.member.id) break;
      var member = message.guild.member(message.mentions.members.first());
      var memberrole = member.roles.color;
      message.delete();
      if (message.guild.ownerID == message.member.id || message.member.hasPermission("BAN_MEMBERS") && role.comparePositionTo(memberrole) > 0) {
        if (!member.kickable) {
          message.reply("I can't ban this member!");
          break;
        }
        if (args[2]) {
          member.ban(args[2])
        } else {
          member.ban();
        }
        message.channel.send(message.member.displayName + member.user.discriminator + ' has banned ' + member.displayName + member.user.discriminator );
      } else {
        message.reply('You do not have enough permissions to ban ' + member.displayName + member.user.discriminator + '!');
      }
    break;
    case 'purge':
      message.delete();
      var fetch = parseInt(args[1]);
      if ((Number.isInteger(fetch))) {
        if (fetch > 100) {
          fetch = 100
          message.reply('I can only check 100 messages at a time.')
        }
        message.channel.messages.fetch({
          limit: fetch,
        }).then((messages) => {
          var messages = messages.filter(message => message.content.startsWith(prefix(message)) || message.author.bot).array().slice(0, fetch);
          message.channel.bulkDelete(messages, true).catch(error => console.error(err));
        });
      } else {
        message.channel.messages.fetch({
          limit: 100,
        }).then((messages) => {
          var messages = messages.filter(message => message.content.startsWith(prefix(message)) || message.author.bot).array().slice(0, 100);
          message.channel.bulkDelete(messages, true).catch(error => console.error(err));
        });
      }
      break;
    case 'navy':
      message.channel.send(navy);
      message.channel.send('https://www.youtube.com/watch?v=NsZMbs5PC64');
      console.log('Navy');
      break;
    case 'info':
      var embed = new Discord.MessageEmbed()
        .setColor(0x0000FF)
        .addField('Name', 'NeonNukeBot')
        .addField('Purpose', 'Dankness')
        .addField('Maker', 'NeonNuke#1160')
        .addField('To add me to your server visit:', 'https://discordapp.com/oauth2/authorize?client_id=373462552614797312&scope=bot&permissions=305153174')
        .addField('My Github', 'https://github.com/Zentrik/DiscordBot')
        .setThumbnail(client.user.avatarURL)
      message.channel.send(embed);
      break;
    case 'role':
      message.reply(newRoleMessage(message));
      break;
    case 'addrole':
      if (!argsrole) {
        message.reply('Please provide a role');
        break;
      }
      if (!message.guild.ownerID == message.member.id || !message.member.hasPermission("MANAGE_ROLES") && message.member.roles.color.comparePositionTo(message.guild.roles.find('name', argsrole).catch(console.error)) > 0) {
        message.reply('You do not have sufficient permissions');
        break;
      }

      var color = randomColor()
      if (argsrole == 'pile of shit') color = '#593001'

      if (!message.guild.roles.find('name', argsrole)) {
        message.guild.roles.create({
          name: argsrole,
          color: color,
          permissions: []
        }).then(function(role) {
          message.member.roles.add(role);
        });
        message.reply('Assigned role, ' + argsrole + ', to you');
      } else if (message.member.roles.find("name", argsrole)) {
        message.reply('You already have this role');
      } else {
        message.member.roles.add(message.guild.roles.find('name', argsrole)).catch(console.error);
        message.reply('Role, ' + argsrole + ', added');
      }
      break;
    case 'deleterole':
      if (!message.guild.ownerID == message.member.id || !message.member.hasPermission("MANAGE_ROLES") && message.member.roles.color.comparePositionTo(message.guild.roles.find('name', argsrole).catch(console.error)) > 0) {
        message.reply('You do not have sufficient permissions');
        break;
      }
      if (argsrole) {
        message.guild.roles.find('name', argsrole).delete().catch(console.error);
        message.reply('Role Deleted');
        console.log('Deleted Role ' + argsrole);
      } else {
        message.reply('Include a role to delete');
        console.log('Role to delete not included');
      }
      break;
    case 'removerole':
      if (argsrole) {
        if (message.members.roles.find('name', argsrole)) {
          message.member.roles.remove(message.members.roles.find('name', argsrole)).catch(console.error);
          message.reply('Role removed');
          console.log('Removed Role ' + argsrole);
        }
      } else {
        message.reply('Include a role to remove');
        console.log('Role to remove not included');
      }
      break;
    case 'play':
      var server = servers[message.guild.id];
      var title = '';
      var searchTerm = String(argssearch);
      var url = 'https://www.youtube.com/watch?v=';
      var id = '';
      var thumbnail = 'https://i.ytimg.com/vi/';
      var channelTitle = '';
      var repeat = parseInt(args[args.length - 1]);

      if (!args[1]) {
        if (server.dispatcher) {
          if (server.dispatcher.pause) {
            server.dispatcher.resume();
            message.channel.send("Music unpaused!");
          } else {
            message.channel.send('Music is already playing');
          }
        } else {
          message.channel.send("Please provide a link");
        }
        break;
      }

      if (!message.member.voiceChannel) {
        message.channel.send("Please join a Voice Channel");
        break;
      }
      if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      };

      if (!args[1].startsWith('https://www.youtube.com/watch?v=')) {
        fs.readFile('client_secret.json', function processClientSecrets(err, content) {
          if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
          }
          authorize(JSON.parse(content), getVideo);
        });

        function authorize(credentials, callback) {
          var clientSecret = credentials.installed.client_secret;
          var clientId = credentials.installed.client_id;
          var redirectUrl = credentials.installed.redirect_uris[0];
          var auth = new googleAuth();
          var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
          fs.readFile(tokenPath, function(err, token) {
            if (err) {
              getNewToken(oauth2Client, callback);
            } else {
              oauth2Client.credentials = JSON.parse(token);
              callback(oauth2Client);
            }
          });
        }

        function getNewToken(oauth2Client, callback) {
          var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
          });
          console.log('Authorize this app by visiting this url: ', authUrl);
          var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          rl.question('Enter the code from that page here: ', function(code) {
            rl.close();
            oauth2Client.getToken(code, function(err, token) {
              if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
              }
              oauth2Client.credentials = token;
              storeToken(token);
              callback(oauth2Client);
            });
          });
        }

        function storeToken(token) {
          try {
            fs.mkdirSync(tokenDir);
          } catch (err) {
            if (err.code != 'EEXIST') {
              throw err;
            }
          }
          fs.writeFile(tokenPath, JSON.stringify(token));
          console.log('Token stored to ' + tokenPath);
        }

        function getVideo(auth) {

          var service = google.youtube('v3');
          service.search.list({
            auth: auth,
            q: searchTerm,
            type: 'video',
            part: 'snippet',
            fields: 'items(id,snippet(channelTitle,title))'
          }, function(err, response) {
            if (err) {
              console.log('The API returned an error: ' + err);
              return;
            }
            var search = response.items;
            if (search.length === 0) {
              console.log('No videos found.');
              message.reply('No videos found');
              return;
            } else {
              id = search[0].id.videoId;
              title = search[0].snippet.title;
              channelTitle = search[0].snippet.channelTitle;
              url = url + id;
              thumbnail = thumbnail + id + '/hqdefault.jpg';
              addAudio(message, repeat, url, title, thumbnail, channelTitle);
              return;
            }
          });
        }
      } else {
        var getid = args[1].slice(32,43);
        if ((Number.isInteger(repeat)) > 0) {
          YTDL.getInfo(getid, (err, info) => {
			         if(err) message.channel.send('Invalid YouTube Link: ' + err);
               var embed = new Discord.MessageEmbed()
                .setColor(0x0000FF)
                .setThumbnail(info.thumbnail_url)
                .addField(info.title, info.author.name)
                .addField('Added', repeat + ' times')
               message.channel.send(embed);
          });
          while (repeat > 0) {
            server.queue.push(args[1]);
            repeat--;
          }
        } else {
          server.queue.push(args[1]);
          YTDL.getInfo(getid, (err, info) => {
			         if(err) message.channel.send('Invalid YouTube Link: ' + err);
               var embed = new Discord.MessageEmbed()
                .setColor(0x0000FF)
                .setThumbnail(info.thumbnail_url)
                .addField(info.title, info.author.name)
               message.channel.send(embed);
          });
        }

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
          play(connection, message);
        })
      }
      break;
    case 'skip':
      if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      };
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
      if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      };
      var server = servers[message.guild.id];

      if (server.dispatcher) {
        if (server.dispatcher.paused) {
          message.channel.send('Music is already paused');
        } else {
          server.dispatcher.pause();
          message.channel.send("Music paused!");
          message.delete();
        }
      } else {
        message.channel.send('No music is playing');
      }
      break;
    case 'volume':
      if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      };
      var server = servers[message.guild.id];
      if (!server.dispatcher.volumeEditable) break;
      if (!args[1]) {
        message.channel.send(server.dispatcher.volume*100);
        break;
      }
      var volume = parseInt(args[1]);

      if (!Number.isInteger(volume)) {
        message.channel.send('Please put a number afterwards');
        break;
      }
      server.dispatcher.setVolume(volume/100);
      break;
    case 'got':
      if (!message.member.voiceChannel) {
        return message.channel.send("Please join a Voice Channel");
        break;
      }
      if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      };

      var server = servers[message.guild.id];
      var repeat = parseInt(args[1]);
      if ((Number.isInteger(repeat)) > 0) {
        message.reply('Game of Thrones themetune added to the Queue ' + repeat + ' times!');
        while (repeat > 0) {
          server.queue.push('https://www.youtube.com/watch?v=s7L2PVdrb_8');
          repeat--;
        }
      } else {
        server.queue.push('https://www.youtube.com/watch?v=s7L2PVdrb_8');
        message.reply("Game of Thrones themetune added to the Queue!");
      }

      if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
      });
      message.delete();
      break;
      case 'dd':
        if (!message.member.voiceChannel) {
          return message.channel.send("Please join a Voice Channel");
          break;
        }
        if (!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
        };

        var server = servers[message.guild.id];
        var repeat = parseInt(args[1]);
        if ((Number.isInteger(repeat)) > 0) {
          message.reply('Daredevil themetune added to the Queue ' + repeat + ' times!');
          while (repeat > 0) {
            server.queue.push('https://www.youtube.com/watch?v=KFYFh8w4758');
            repeat--;
          }
        } else {
          server.queue.push('https://www.youtube.com/watch?v=KFYFh8w4758');
          message.reply("Daredevil themetune added to the Queue!");
        }

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
          play(connection, message);
        });
        message.delete();
        break;
    case 'west':
      if (!message.member.voiceChannel) {
        return message.channel.send("Please join a Voice Channel");
        break;
      }
      if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      };

      var server = servers[message.guild.id];
      var repeat = parseInt(args[1]);
      if ((Number.isInteger(repeat)) > 0) {
        message.reply('WestWorld themetune added to the Queue ' + repeat + ' times! :wink:');
        while (repeat > 0) {
          server.queue.push('https://www.youtube.com/watch?v=rYelEUVQ50g');
          repeat--;
        }
      } else {
        server.queue.push('https://www.youtube.com/watch?v=rYelEUVQ50g');
        message.reply("WestWorld themetune added to the Queue! :wink:");
      }

      if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
      });
      message.delete();
      break;
    case 'queue':
      var m = message.guild.id;
      var v = false
      if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      };

      var server = servers[m.toString()];
      if (server.queue[0] == undefined) {
        message.channel.send('The queue is empty')
        break;
      }

      var queueEmbed = new Discord.MessageEmbed()
      .setColor(0x0000FF)
      async.eachSeries(server.queue, function(video, callback) {
        YTDL.getInfo(video.replace('https://www.youtube.com/watch?v=', ''), (err, info) => {
          if (err) throw err;
            queueEmbed.addField(info.title, info.author.name)
            if (v == false) {
              queueEmbed.setThumbnail(info.thumbnail_url)
              v = true
            }
            callback();
        });
      }, function(err) {
        if(err) {
          console.log(err);
          message.channel.send('Please try again later');
        } else {
          message.channel.send(queueEmbed);
      }
      });
      break;
    case 'stats':
      message.channel.send("'Statistics' \n 'Uptime:'   #" + `${GetUptime(client)}` + "\n 'Servers:'  #" + `${client.guilds.size}` + "\n 'Users:'    #" + `${client.users.size}` + "\n 'Channels:' #" + `${client.channels.size}` + "\n 'Memory:'   #" + `${BytesToSize(process.memoryUsage().rss, 3)}`, {
        code: 'cs'
      });
      console.log('Stats');
      break;
    case 'kick':
      if (message.mentions.members.first() === undefined) {
        message.delete;
        message.reply('Please specify a user to kick with a mention')
        break;
      }
      var role = message.member.roles.color;
      if (role == null && !message.guild.ownerID == message.member.id) break;
      var member = message.guild.member(message.mentions.members.first());
      var memberrole = member.roles.color;
      message.delete();
      if (message.guild.ownerID == message.member.id || message.member.hasPermission("KICK_MEMBERS") && role.comparePositionTo(memberrole) > 0) {
        if (!member.kickable) {
          message.reply("I can't kick this member!");
          break;
        }
        member.kick();
        message.channel.send(message.member.displayName + member.user.discriminator + ' has kicked ' + member.displayName + member.user.discriminator );
      } else {
        message.reply('You do not have enough permissions to kick ' + member.displayName + member.user.discriminator + '!');
      }
      break;
    case 'myrole':
      console.log(message.member.roles.color);
      break;
    case 'google':
    case'search':
      let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(argsrole)}`;
      return snekfetch.get(searchUrl).then((result) => {
        let $ = cheerio.load(result.text);
        let googleData = $('.r').first().find('a').first().attr('href');
        googleData = querystring.parse(googleData.replace('/url?', ''));
        message.reply(`Result found!\n${googleData.q}`)
      }).catch((err) => {
     message.reply('No results found!');
  });
    case 'help':
      var embed = new Discord.MessageEmbed()
        .setColor(0x0000FF)
        .addField(prefix(message) + 'Navy', 'Navy Seals Copypasta with video')
        .addField(prefix(message) + 'Purge', 'Delete all messages from bots or those starting with n!')
        .addField(prefix(message) + 'Role', 'Shows role set for newbs')
        .addField(prefix(message) + 'SetRole', 'Role following command becomes role for newbs')
        .addField(prefix(message) + 'RemoveRole', 'Removes Role following command from Member')
        .addField(prefix(message) + 'DeleteRole', 'Deletes Role following command from Server')
        .addField(prefix(message) + 'AddRole', 'Adds Role following command to Member')
        .addField(prefix(message) + 'Play', 'Plays audio from Youtube video or searches , to repeat the audio place a number after the link')
        .addField(prefix(message) + 'Pause', 'Pauses current song')
        .addField(prefix(message) + 'Skip', 'Skip current song')
        .addField(prefix(message) + 'Stop', 'Stops audio and clears queue')
        .addField(prefix(message) + 'Volume', 'sets volume to number after command out of 100')
        .addField(prefix(message) + 'Queue', 'Prints Queue')
        .addField(prefix(message) + 'Got', 'Plays Game of Thrones themetune, to repeat the audio place a number after the link')
        .addField(prefix(message) + 'West', 'Plays WestWorld themetune, to repeat the audio place a number after the link')
        .addField(prefix(message) + 'DD', 'Plays Daredevil themetune, to repeat the audio place a number after the link')
        .addField(prefix(message) + 'Info', 'Info')
        .addField(prefix(message) + 'Stats', 'View bot statistics')
        .addField(prefix(message) + 'Purge (number)', 'Fetches the defined number or 100 messages and deletes all of them that are bot messages or start with n!')
        .addField(prefix(message) + 'Eval', 'Eval command for the owner of this bot')
        .addField(prefix(message) + 'Kick @member', 'Kicks mentioned member')
        .addField(prefix(message) + 'Google/Search', 'Searches for query after command')
        .setThumbnail(client.user.avatarURL)
      message.channel.send(embed);
      console.log('Help');
      break;
    default:
      message.reply('Invalid command. See n!help');
      console.log('Invalid Command ');
  }
});

client.login(config.token);
