/**
 * Created by Ruslan on 6/12/2017.
 */
var restify = require('restify');
var builder = require('botbuilder');
var speak = require("speakeasy-nlp");
var natural = require("natural");
var helpers = require('./helpers.js');
var apiToken = '73829fb22d0ae72203f15fbbbd2d5034';
var urls = require('./api-handler/api-urls');
var util = require('util');
var request = require('request');

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
            console.log(result);
            session.send({
                "type": "AdaptiveCard",
                "version": "0.5",
                "body": [
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Meow!"
                            },
                            {
                                "type": "Image",
                                "url": "http://adaptivecards.io/api/cat"
                            }
                        ]
                    }
                ]
            });
        }
    });
});

function makeRequest(url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(JSON.parse(body).data);
        } else {
            callback(false);
        }
    })
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
                console.log('weather');
                makeRequest(addURLParams(urls.weather), function (result) {
                    callback(result);
                });
            } else if (parsed.tokens.indexOf('food') >= 0 || classified === 'food') {
                if (parsed.tokens.indexOf('watcard') >= 0) {
                    makeRequest(addURLParams(urls.watcard), function (result) {
                        callback(result);
                    });
                    console.log('food watcard');
                } else if (parsed.action === 'what') {
                    makeRequest(addURLParams(urls.menu), function (result) {
                        callback(result);
                    });
                    console.log('food menu');
                } else if (parsed.action === 'where') {
                    makeRequest(addURLParams(urls.food_locations), function (result) {
                        callback(result);
                    });
                    callback('food locations');
                }
            } else if (parsed.tokens.indexOf('atm') >= 0 || parsed.tokens.indexOf('atms') >= 0) {
                makeRequest(addURLParams(urls.atm), function (result) {
                    callback(result);
                });
                console.log('atm');
            } else if (parsed.tokens.indexOf('news') >= 0) {
                makeRequest(addURLParams(urls.news), function (result) {
                    callback(result);
                });
                console.log('news');
            } else {
                var srch = helpers.searchUW(parsed.subject, classified);
                if (srch  !== null) {
                    makeRequest(addURLParams(util.format(urls.find_build, srch)), function (result) {
                        callback(result);
                    });
                    console.log(srch);
                } else {
                    callback(false);
                }
            }
        }
    });
}

function addURLParams (string) {
    return string + '?key=' + apiToken;
}
