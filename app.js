/**
 * Created by Ruslan on 6/12/2017.
 */
var restify = require('restify');
var builder = require('botbuilder');
var speak = require("speakeasy-nlp");
var natural = require("natural");
var helpers = require('./helpers.js');
var apiToken = '73829fb22d0ae72203f15fbbbd2d5034';
var uwapi = require('./api-handler/uwapi')(apiToken);
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


var bot = new builder.UniversalBot(connector, function(session){
    var msg = session.message.text;

    understand(msg, function (result) {
        if (!result) {
            session.send("Could not find anything");
        } else {
            session.send(result);
        }
    });
});

function makeQueryList(string, list) {
    var catArr = [];

    for (var i = 0; i < list.length; i++) {
        catArr.push(list[i].category);
    }

    return util.format('%s %s', string, catArr.join(', '));
}

function understand (question, callback) {
    natural.BayesClassifier.load('training/classifier.json', null, function (err, classifier) {
        if (err) {
            console.error("Failed to load classifier");
            callback("Failed to load classifier");
        } else {
            var parsed = speak.classify(question);
            var classified = classifier.classify(question);
            console.log(parsed);
            console.log(classified);

            if (parsed.tokens.indexOf('weather') >= 0) {
                callback('weather');
            } else if (parsed.tokens.indexOf('food') >= 0 || classified === 'food') {
                if (parsed.tokens.indexOf('watcard') >= 0) {
                    callback('food watcard');
                } else if (parsed.action === 'what') {
                    callback('food menu');
                } else if (parsed.action === 'where') {
                    callback('food locations');
                }
            } else if (parsed.tokens.indexOf('atm') >= 0 || parsed.tokens.indexOf('atms') >= 0) {
                callback('atm');
            } else if (parsed.tokens.indexOf('news') >= 0) {
                callback('news');
            } else {
                if (helpers.searchUW(parsed.subject, classified) !== null) {
                    callback('building');
                } else {
                    callback(false);
                }
            }
        }
    });
}
