"use strict";
// ^ This is important
// This is the name of your process. what you put here will show up when you use "top" in linux        (I use htop.)
process.title = 'Jambot :)'

var Discord = require("discord.js");
var bot = new Discord.Client();


// Date and version. You probably don't need this.
var d = new Date()
var version = "0.1.18C"

bot.on("message", msg => {

  // Set the prefix to whatever you like. 
  let prefix = "$";

  // Ignore if there's no prefix
  if(!msg.content.startsWith(prefix)) return;
  // ignore if Author is a bot
  if(msg.author.bot) {
      // You can change this message to not appear.
    bot.sendMessage(msg, "You're not a human! You're a robot!");
  } 

// Basic ping. Use this to see if your bot is working. 

 if (msg.content.startsWith(upperjam + "ping")) {
    bot.sendMessage(msg, "pong!");
  } 
   
// ----------------------------
// -----api.ai Integration-----                                                                                               jam likes fancy formatting :)
// ----------------------------

var apiai = require('apiai');
// Api.ai Token DO NOT SHARE THIS. Make sure to put in your discord bot token in at the bottem.
var app = apiai("API.AI.TOKEN");

var request = app.textRequest(`${msg.content.slice(1)}`);

// Log all responses.
request.on('response', function(response) {
    console.log(response);
   
     
});
 
request.on('error', function(error) {
    console.log(error);
});

 
request.end()

    // if the message equals the prefix + something, run what's inside.
   if (msg.content.startsWith(prefix + "")) {

       // Sends a request to discord with the message content. Also removes the prefix. Change the number depending on the length of your prefix.
       app.textRequest(`${msg.content.slice(1)}`);
       // Get that response
       request.on('response', function(response) {
       // I did this to make it easier to read. Set's response text equal to the output speech. 
       let responseText = response.result.fulfillment.speech;
       // Send the message to discord.
       bot.sendMessage(msg, `${responseText}`);
    });
    
  }

// Pretty self explanitory but it logs errors.
request.on('error', function(error) {
    console.log(error);
});

// -------------
// -----Lol-----                                                                                   jam likes fancy formatting :)
// -------------





// END   (I did this so I didn't delete them on accident)
});
//END 

// Enter your discord bot token here.  DO NOT SHARE IT! 
bot.loginWithToken("DISCORD_BOT_TOKEN");



