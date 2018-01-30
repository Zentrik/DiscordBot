const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');
const readline = require('readline');
const YTDL = require('ytdl-core');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const moment = require('moment');
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const tokenPath = './youtubeCredentials.json';
const tokenDir = './';
const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];
const cheerio = require('cheerio'),
      snekfetch = require('snekfetch'),
      querystring = require('querystring');

require('moment-duration-format');

const NewRole = new Enmap({
  provider: new EnmapLevel({
    name: 'NewRole'
  })
});
const Colour = new Enmap({
  provider: new EnmapLevel({
    name: 'Colour'
  })
});
const GetUptime = bot => {
  return moment.duration(bot.uptime).format('d:hh:mm', {
    trim: false
  });
};
const Unit = ['', 'K', 'M', 'G', 'T', 'P'];
const BytesToSize = (input, precision) => {
  let index = Math.floor(Math.log(input) / Math.log(1024));
  if (Unit >= Unit.length) return input + ' B';
  return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + Unit[index] + 'B';
};

var servers = {};
var randomColor = '#000000'.replace(/0/g, function() {
  return (~~(Math.random() * 16)).toString(16);
});
var addRoleName = '';
var colour1 = 0x593001;
var spam = 'SPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAMSPAM!!!!';
var navy = 'What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.';

function memberName(message) {
  return message.guild.members.get(message.member.id).displayName;
}

function memberName1(member) {
  return member.guild.members.get(member.id).displayName;
}

function color(member) {
  if (!Colour.get(member.guild.id)) {
    if (NewRole.get(member.guild.id).toLowerCase() === 'pile of shit') {
      Colour.set(member.guild.id, 0x593001);
    } else {
      Colour.set(member.guild.id, randomColor);
    }
  }
  return Colour.get(member.guild.id);
}

function roleName(message) {
  NewRole.get(message.guild.id);
}

function newRole(member) {
  member.guild.roles.find('name', NewRole.get(member.guild.id));
}

function newRoleName(member) {
  if (!NewRole.get(member.guild.id)) {
    NewRole.set(member.guild.id, 'Pile of Shit');
  }
  return NewRole.get(member.guild.id);
}

function newRoleMessage(message) {
  if (!NewRole.get(message.guild.id)) {
    NewRole.set(message.guild.id, 'Pile of Shit');
  }
  return NewRole.get(message.guild.id);
}

function RoleColourset(message) {
  if (addRoleName.toLowerCase() === 'pile of shit') {
    colour1 = 0x593001;
  } else {
    colour1 = randomColor;
  }
}

function play(connect, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connect.playStream(YTDL(server.queue[0], {
    filter: "audioonly"
  }));
  server.queue.shift();
  server.dispatcher.on("end", function() {
    if (server.queue[0]) play(connect, message);
    else connect.disconnect();
  });
}

function addAudio(message, repeat, url, title, thumbnail, channelTitle) {
  var server = servers[message.guild.id];
  if ((Number.isInteger(repeat)) > 0) {
    var embed = new Discord.RichEmbed()
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
    var embed = new Discord.RichEmbed()
      .setColor(0x0000FF)
      .setThumbnail(thumbnail)
      .addField(title, channelTitle)
    message.channel.send(embed);
  }
  if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connect) {
    play(connect, message);
  });
  message.delete();
}

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
  }

bot.on('ready', function() {
  bot.user.setPresence({game: { name: 'n!help | ' + `${bot.guilds.size}` + ' servers'}});
  console.log('Ready');
});

bot.on('guildMemberAdd', function(member) {
  member.guild.channels.find('name', 'general').send(member.toString() + ', Welcome you ' + newRoleName(member) + ', type n!help for a list of commands');
  console.log('Welcome message sent to ' + memberName1(member));

  if (!newRole(member)) {
    RoleColour(member);
    console.log('Role Colour set to: ' + color(member));
    member.guild.createRole({
      name: newRoleName(member),
      color: color(member),
      permissions: []
    }).then(function(role) {
      console.log('New Role, ' + newRoleName(member) + ',created with the colour,  ' + color(member) + '.');
      member.addRole(role).catch(console.error);
      console.log(memberName1(member) + ' assigned ' + newRoleName(member));
    });
  } else {
    member.addRole(newRole(member)).catch(console.error);
    console.log(memberName1(member) + ' assigned ' + newRoleName(member));
  }
});

bot.on('message', function(message) {
  if (!message.content.startsWith(config.prefix) && !message.content.startsWith(config.prefix_uppercase) || message.author.bot) return;

  var args = message.content.substring(config.prefix.length).split(' ');
  var argsrole = [].slice.call(args).splice(1,args.length).join(' ');
  var argslast = parseInt(args[args.length - 1])
  if (Number.isInteger(argslast)) {
    var argssearch = [].slice.call(args).splice(1, args.length - 2).join(' ');
  } else {
    var argssearch = [].slice.call(args).splice(1, args.length - 1).join(' ');
  }
  if (args[0].startsWith('eval')) {
    if(message.author.id !== config.ownerID) return;
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
    case 'purge':
      message.delete();
      var fetch = parseInt(args[1]);
      if ((Number.isInteger(fetch))) {
        if (fetch > 100) {
          fetch = 100
          message.reply('I can only check 100 messages at a time.')
        }
        message.channel.fetchMessages({
          limit: fetch,
        }).then((messages) => {
          var messages = messages.filter(message => message.content.startsWith(config.prefix) || message.content.startsWith(config.prefix_uppercase) || message.author.bot).array().slice(0, fetch);
          message.channel.bulkDelete(messages, true).catch(error => console.log(error.stack));
        });
      } else {
        message.channel.fetchMessages({
          limit: 100,
        }).then((messages) => {
          var messages = messages.filter(message => message.content.startsWith(config.prefix)|| message.content.startsWith(config.prefix_uppercase) || message.author.bot).array().slice(0, 100);
          message.channel.bulkDelete(messages, filterOld = true).catch(error => console.log(error.stack));
        });
      }
      break;
    case 'navy':
      message.channel.send(navy);
      message.channel.send('https://www.youtube.com/watch?v=NsZMbs5PC64');
      console.log('Navy');
      break;
    case 'info':
      var embed = new Discord.RichEmbed()
        .setColor(0x0000FF)
        .addField('Name', 'NeonNukeBot')
        .addField('Purpose', 'Dankness')
        .addField('Maker', 'NeonNuke#1160')
        .addField('To add me to your server visit:', 'https://discordapp.com/oauth2/authorize?client_id=373462552614797312&scope=bot&permissions=305155072')
        .addField('My Github', 'https://github.com/Zentrik/DiscordBot')
        .setThumbnail(bot.user.avatarURL)
      message.channel.send(embed);
      console.log('Info');
      break;
    case 'spam':
      message.channel.send(spam);
      console.log('Spam');
      break;
    case 'setrole':
      NewRole.set(message.guild.id, argsrole);
      message.reply(argsrole + ' is now the default role for newbs');
      break;
    case 'role':
      message.reply(newRoleMessage(message));
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
      if (!argsrole) {
        message.reply('Please provide a role');
        console.log(memberName(message) + ' did not provide a role');
        break;
      } else {
        addRoleName = argsrole;
      }

      if (!message.guild.roles.find('name', argsrole)) {
        message.guild.createRole({
          name: argsrole,
          color: randomColor,
          permissions: []
        }).then(function(role) {
          message.member.addRole(role);
        });
        message.reply('Assigned role, ' + argsrole + ', to you');
      } else if (message.member.roles.find("name", argsrole)) {
        message.reply('You already have this role');
      } else {
        message.member.addRole(message.guild.roles.find('name', argsrole)).catch(console.error);
        message.reply('Role, ' + argsrole + ', added');
      }
      break;
    case 'deleterole':
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
          message.member.removeRole(message.members.roles.find('name', argsrole)).catch(console.error);
          message.reply('Role removed');
          console.log('Removed Role ' + argsrole);
        }
      } else {
        message.reply('Include a role to remove');
        console.log('Role to remove not included');
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

      var title = '';
      var searchTerm = String(argssearch);
      var url = 'https://www.youtube.com/watch?v=';
      var id = '';
      var thumbnail = 'https://i.ytimg.com/vi/';
      var channelTitle = '';
      var repeat = parseInt(args[args.length - 1]);

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
        url = args[1];
        addAudio(message, repeat, url, title, thumbnail, channelTitle);
      }
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
      var repeat = parseInt(args[1]);
      if ((Number.isInteger(repeat)) > 0) {
        message.reply('Game of Thrones themetune added to the Queue ' + repeat + ' times! :wink:');
        while (repeat > 0) {
          server.queue.push('https://www.youtube.com/watch?v=s7L2PVdrb_8');
          repeat--;
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
      case 'dd':
        if (!message.member.voiceChannel) {
          return message.channel.send("Please join a Voice Channel");
        }
        if (!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
        };

        var server = servers[message.guild.id];
        var repeat = parseInt(args[1]);
        if ((Number.isInteger(repeat)) > 0) {
          message.reply('Daredevil themetune added to the Queue ' + repeat + ' times! :wink:');
          while (repeat > 0) {
            server.queue.push('https://www.youtube.com/watch?v=KFYFh8w4758');
            repeat--;
          }
        } else {
          server.queue.push('https://www.youtube.com/watch?v=KFYFh8w4758');
          message.reply("Daredevil themetune added to the Queue! :wink:");
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
      break;
    case 'stats':
      message.channel.send("'Statistics' \n 'Uptime:'   #" + `${GetUptime(bot)}` + "\n 'Servers:'  #" + `${bot.guilds.size}` + "\n 'Users:'    #" + `${bot.users.size}` + "\n 'Channels:' #" + `${bot.channels.size}` + "\n 'Memory:'   #" + `${BytesToSize(process.memoryUsage().rss, 3)}`, {
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
      var role = message.member.colorRole;
      var member = message.guild.member(message.mentions.members.first());
      var memberrole = member.colorRole;
      message.delete();
      if (message.member.hasPermission("KICK_MEMBERS") && role.comparePositionTo(memberrole) > 0 || message.guild.ownerID == message.member.id) {
        member.kick();
        message.channel.send(memberName(message) + ' has kicked ' + member.displayName);
      } else {
        message.reply('You do not have enough permissions to kick ' + member.displayName);
      }
      break;
    case 'myrole':
      console.log(message.member.colorRole);
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
      var embed = new Discord.RichEmbed()
        .setColor(0x0000FF)
        .addField(config.prefix + 'Navy', 'Navy Seals Copypasta with video')
        .addField(config.prefix + 'Spam', 'Spams Chat')
        .addField(config.prefix + 'Purge', 'Delete all messages from bots or those starting with n!')
        .addField(config.prefix + 'Role', 'Shows role set for newbs')
        .addField(config.prefix + 'SetRole', 'Role following command becomes role for newbs')
        .addField(config.prefix + 'RemoveRole', 'Removes Role following command from Member')
        .addField(config.prefix + 'DeleteRole', 'Deletes Role following command from Server')
        .addField(config.prefix + 'AddRole', 'Adds Role following command to Member')
        .addField(config.prefix + 'RemovenewRole', 'Removes Role for newbs from Member')
        .addField(config.prefix + 'DeletenewRole', 'Deletes Role for newbs from Server')
        .addField(config.prefix + 'Play', 'Plays audio from Youtube video or searches , to repeat the audio place a number after the link')
        .addField(config.prefix + 'Pause', 'Pauses current song')
        .addField(config.prefix + 'Unpause', 'unpauses current song')
        .addField(config.prefix + 'Skip', 'Skip current song')
        .addField(config.prefix + 'Stop', 'Stops audio and clears queue')
        .addField(config.prefix + 'Queue', 'Prints Queue')
        .addField(config.prefix + 'Got', 'Plays Game of Thrones themetune, to repeat the audio place a number after the link')
        .addField(config.prefix + 'West', 'Plays WestWorld themetune, to repeat the audio place a number after the link')
        .addField(config.prefix + 'DD', 'Plays Daredevil themetune, to repeat the audio place a number after the link')
        .addField(config.prefix + 'Info', 'Info')
        .addField(config.prefix + 'Stats', 'View bot statistics')
        .addField(config.prefix + 'Purge (number)', 'Fetches the defined number or 100 messages and deletes all of them that are bot messages or start with n!')
        .addField(config.prefix + 'Eval', 'Eval command for the owner of this bot')
        .addField(config.prefix + 'Kick @member', 'Kicks mentioned member')
        .addField(confing.prefix + 'Google/Search', 'Searches for query after command')
        .setThumbnail(bot.user.avatarURL)
      message.channel.send(embed);
      console.log('Help');
      break;
    default:
      message.reply('Invalid command. See n!help');
      console.log('Invalid Command ');
  }
});

bot.login(config.token);
