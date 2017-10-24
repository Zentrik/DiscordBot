# DiscordBot

#First we need to add your bot to your server and get a token
Creating a bot in discord is stupid easy, first you need to go to [here](https://discordapp.com/developers/applications/me) and click "New Application"
![Application Screen](http://i.imgur.com/FvgfY2Z.png)
Now give your bot a name and a picture, a description isn't necessary.
![New Application Screen](http://i.imgur.com/MOS7yvH.png)
Click "Create Application". On the next page scroll down until you see "Create a bot user", click that. Also click yes do it.
![Screen you see after creating a new application then scrolling down a little.](http://i.imgur.com/YAzK5ml.png)
![Yes Do It.](http://i.imgur.com/vkF6Rxo.png)
Now you can get your bot's token, by using the "click to reveal button" in the app bot user section.
![New Bot Page](http://i.imgur.com/xhKMUVU.png)
![Token](http://i.imgur.com/QwCmJJM.png)
There's your token! Copy this token into the placeholder at `config.json`. Now its time to invite your bot to your server. Don't worry about your bot being started for this next step. Change the client_id to your Client ID under App Details, then go to this url ```https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0```
![Authorize Bot](http://i.imgur.com/Ggwy0BP.png)
Now select your server, then click authorize.
![Authorized](http://i.imgur.com/4cqNcs1.png)
That's it! Now you can start your bot and enjoy chatting!
