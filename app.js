/**
 * Created by Ruslan on 6/12/2017.
 */
var restify = require('restify');
var builder = require('botbuilder');
var speak = require("speakeasy-nlp");
var request = require("request");
var apiToken = '73829fb22d0ae72203f15fbbbd2d5034';
var uwapi = require('./api-handler/uwapi')(apiToken);

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
    var string = session.message.text;
    var parsedQ = speak.classify(string);

    console.log(parsedQ);

    uwapi.buildings({'building_code': parsedQ.subject}, {}).then(function(data) {
        session.send(data.building_id);
    }, function () {
        session.send("Couldn't find anything");
    });

});