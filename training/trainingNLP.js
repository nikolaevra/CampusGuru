/**
 * Created by ruslan on 15/06/17.
 */

var natural = require("natural");
var tSet = require('../uw-data/UWDefinitions.json');

var idData = tSet.idData;

classifier = new natural.BayesClassifier();

// associate all of the buildings names with building keyword
for (var i = 0; i < idData.length; i++) {
    classifier.addDocument(idData[i].unit_full_name.toString() + " " +  idData[i].unit_code.toString(),
    "buildings");
}

// associate all building names with their codes
for (var k = 0; i < idData.length; k++) {
    classifier.addDocument(idData[k].unit_full_name.toString(), idData[k].unit_code.toString());
}

classifier.train();

classifier.save('classifier.json', function(err, classifier) {
    // the classifier is saved to the classifier.json file!
});

