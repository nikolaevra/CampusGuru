/**
 * Created by Ruslan on 6/12/2017.
 */
var restify = require('restify');
var builder = require('botbuilder');
var apiToken = '73829fb22d0ae72203f15fbbbd2d5034';
var uwapi = require('uwapi')(apiToken);

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function(session){
    var query = session.message.text;
    var qArray = query.split(" ");

    if (qArray.indexOf("Where") > -1) {
        uwapi.buildingsList().then(function(buildings) {
            session.send(buildings);
        });
    } else {
        //Not in the array
    }
});