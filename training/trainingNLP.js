/**
 * Created by ruslan on 15/06/17.
 */

var natural = require("natural");
var tSet = require('../uw-data/UWDefinitions.json');
var idData = tSet.idData;

classifier = new natural.BayesClassifier();

// associate all building names with their codes
for (var k = 0; k < idData.length; k++) {
    classifier.addDocument(idData[k].unit_full_name.toString(), idData[k].unit_code.toString());
}

classifier.train();

classifier.save('classifier.json');

console.log(classifier.classify('SLC'));
console.log(classifier.classify('Health building'));