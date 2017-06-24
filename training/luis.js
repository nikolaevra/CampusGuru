var speak = require("speakeasy-nlp");
var natural = require("natural");

module.exports = {
    init: function (callback) {
        natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
            this.loaded = classifier;
            callback(true);
        });
    },

    understand: function (question) {
        var classifier = this.loaded;
        var parsed = speak.classify(question);
        console.log(classifier.classify(question));

        if (parsed.tokens.indexOf('weather') >= 0) {
            return 'weather';
        } else if (parsed.tokens.indexOf('food') >= 0) {
            if (parsed.tokens.indexOf('watcard') >= 0) {
                return 'food watcard';
            } else if (parsed.action === 'what') {
                return 'food menu';
            } else if (parsed.action === 'where') {
                return 'food locations';
            }
        } else if (parsed.tokens.indexOf('atm') >= 0 || parsed.tokens.indexOf('atms') >= 0) {
            return 'atm';
        } else if (parsed.tokens.indexOf('feds') >= 0) {
            if (parsed.action === 'what') {
                return 'feds events';
            } else if (parsed.action === 'where') {
                return 'feds locations';
            } else {
                return false;
            }
        } else if (parsed.tokens.indexOf('courses') >= 0) {
            return 'courses';
        } else if (parsed.tokens.indexOf('news') >= 0) {
            return 'news';
        } else if (parsed.tokens.indexOf('opportunities') >= 0) {
            return 'opportunities';
        } else if (parsed.tokens.indexOf('buildings') >= 0) {
            return 'buildings search';
        } else {
            return false;
        }
    }
};

/*

 console.log(natural.PorterStemmer.stem("words")); // stem a single word
 tokenizer = new natural.WordTokenizer();

 console.log(tokenizer.tokenize("your dog has fleas."));
 */