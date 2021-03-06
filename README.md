# DiscordBot

### First we need to add your bot to your server and get a token
Follow this guide: [Creating a discord bot & getting a token by reactiflux](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)

##### Then we need to setup our bot on our computer 
1. Create a folder where your bot will be located and go there in terminal/node.js command prompt
2. Download the repository's file into your project folder

##### We also need to install 'dependencies', so that our bot can connect to our server in discord and work
1. [First we need Node.js and npm](https://nodejs.org/en/download/package-manager/)
2. Run all of these commands, using node.js command prompt as administator (only for windows)
3. If you are on windows first run `npm install --global windows-build-tools`.
4. Then run `npm install` 

##### Youtube Data API
1. Use this [wizard](https://console.developers.google.com/start/api?id=youtube) to create or select a project in the Google Developers Console and automatically turn on the API. Click Continue, then Go to credentials.
2. On the Add credentials to your project page, click the Cancel button.
3. At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.
4. Select the Credentials tab, click the Create credentials button and select OAuth client ID.
5. Select the application type Other, enter the name "YouTube Data API Quickstart", and click the Create button.
6. Click OK to dismiss the resulting dialog.
7. Click the download (Download JSON) button to the right of the client ID.
8. Move this file to your project directory and rename it to client_secret.json.

##### Run it 
1. Run `node bot`
2. The first time you will have to visit the provided url and copy the code
3. Now the bot should show up in the server you told it to and you can type `n!help` for a list of commands
4. Give your bot admin under roles so that it can perform all of its functions.



