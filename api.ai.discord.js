"use strict";
process.title = 'botname'

const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('config.json')
const apiai = require('apiai')
const app = apiai(config.apiaiToken);

bot.on("message", msg => {

    let prefix = config.prefix;

    if (!msg.content.startsWith(prefix)) return;
    // ignore if Author is a bot
    if (msg.author.bot) return;

    const request = app.textRequest(msg.content.slice(2), {
        sessionId: msg.author.id
    });
    request.on('response', function(response) {
        console.log(response);
        var intent = response.result.metadata.intentName

        // Here you can make if statements to check if an intent it used
        // e.x 
        // if (intent == "yes") {
        //     msg.channel.send('no')
        // }
    });

    request.on('error', function(error) {
        console.log(error);
    });

    request.end()

    request.on('response', function(response) {
        let responseText = response.result.fulfillment.speech;
        msg.channel.send(`${responseText}`);
    });

    request.on('error', function(error) {
        console.log(error);
    });

});

bot.login(config.discordToken);
