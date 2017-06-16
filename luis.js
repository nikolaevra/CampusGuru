var natural = require("natural");

console.log(natural.PorterStemmer.stem("words")); // stem a single word
tokenizer = new natural.WordTokenizer();
console.log(tokenizer.tokenize("your dog has fleas."));

classifier = new natural.BayesClassifier();
classifier.addDocument('i am long qqqq', 'buy');
classifier.addDocument('buy the q\'s', 'buy');
classifier.addDocument('short gold', 'sell');
classifier.addDocument('sell gold', 'sell');
console.log(classifier.getClassifications('i am long copper'));

classifier.save('classifier.json', function(err, classifier) {
    // the classifier is saved to the classifier.json file!
});

/*
natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
    console.log(classifier.classify('long SUNW'));
    console.log(classifier.classify('short SUNW'));
});


*/