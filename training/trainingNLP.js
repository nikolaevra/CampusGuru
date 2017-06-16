/**
 * Created by ruslan on 15/06/17.
 */

var natural = require("natural");
var tSet = require('./UWDefinitions.json').data;

classifier = new natural.BayesClassifier();

for (var i = 0; i < tSet.length; i++) {
    classifier.addDocument(tSet[i].unit_full_name.toString(), tSet[i].unit_code.toString());
}
classifier.train();

console.log(classifier.classify('Math'));

/*
classifier.save('classifier.json', function(err, classifier) {
    // the classifier is saved to the classifier.json file!
});
*/
