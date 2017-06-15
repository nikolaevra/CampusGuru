/**
 * Created by Ruslan on 6/12/2017.
 */
var restify = require('restify');
var builder = require('botbuilder');
var speak = require("speakeasy-nlp");
var apiToken = '73829fb22d0ae72203f15fbbbd2d5034';
var uwapi = require('./api-handler/uwapi')(apiToken);
const commMap = require('./bot_structure.json');
var has = require('lodash.has');
var util = require('util');

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

// set pointer
var p = commMap;

var bot = new builder.UniversalBot(connector, function(session){
    var msg = session.message.text;

    session.send(makeQueryList(p.msg, p.children));
});

function makeQueryList(string, list) {
    var catArr = [];

    for (var i = 0; i < list.length; i++) {
        catArr.push(list[i].category);
    }

    return util.format('%s %s', string, catArr.join(', '));
}
