# DiscordBot

### First we need to add your bot to your server and get a token
Follow this guide: [Creating a discord bot & getting a token by reactiflux](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)

##### We also need to install 'dependencies', so that our bot can connect to our server in discord and work
1. [First we need Node.js and npm](https://nodejs.org/en/download/current/)
2. Create a folder where your bot will be located and go there in terminal/node.js command prompt
3. Run `npm init`, and fill out the fields, make sure entry point is bot.js
4. Run all of these commands separately, using `sudo` or running node.js command prompt as administator
If you are on windows first run `npm install --global windows-build-tools`.
```npm install discord.js node-opus --save
npm install bufferutil --save
npm install discordapp/erlpack --save
npm install uws@0.14.5 --save
npm install opusscript@0.0.3
npm install libsodium-wrappers@0.5.4 --save
npm install enmap-level
npm i enmap
npm install ytdl-core
npm i -g ffmpeg-binaries
```
##### Then we need to setup our bot on our computer 
1. Download the repository's file into your project folder

##### Run it 
1. Navigate to your project folder in terminal/node.js command prompt, and run `node bot`
2. Now the bot should show up in the server you told it to and you can type `!help` for a list of commands
3. Give your bot admin under roles so that it dan perform all of its functions.



