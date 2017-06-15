var data = require('./testQuestions.json');
var speak = require("speakeasy-nlp");
var questions = data.testCases;


for (var i = 0; i < questions.length; i ++) {
    var parsed = speak.classify(questions[i]);

    console.log(parsed);

    if (parsed.tokens.indexOf('weather') >= 0) {
        console.log(i, 'Weather');
    } else if (parsed.tokens.indexOf('food') >= 0) {
        if (parsed.tokens.indexOf('watcard') >= 0) {
            console.log(i, 'food watcard');
        } else if (parsed.action === 'what') {
            console.log(i, 'food menu');
        } else if (parsed.action === 'where') {
            console.log(i, 'food locations');
        }
    } else if (parsed.tokens.indexOf('atm') >= 0 || parsed.tokens.indexOf('atms') >= 0) {
            console.log(i, 'atm');
    } else if (parsed.tokens.indexOf('feds') >= 0) {
        if (parsed.action === 'what') {
            console.log(i, 'feds events');
        } else if (parsed.action === 'where') {
            console.log(i, 'feds locations');
        } else {
            console.log(i, 'Please be more specific what you wanted to know about feds');
        }
    } else if (parsed.tokens.indexOf('courses') >= 0) {
        console.log(i, 'courses');
    } else if (parsed.tokens.indexOf('news') >= 0) {
        console.log(i, 'news');
    } else if (parsed.tokens.indexOf('opportunities') >= 0) {
        console.log(i, 'opportunities');
    } else if (parsed.tokens.indexOf('buildings') >= 0) {
        console.log(parsed);
        console.log(i, 'buildings search');
    } else {
        console.log(i, 'fail');
    }
}

