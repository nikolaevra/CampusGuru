/**
 * Created by ruslan on 15/06/17.
 */

var natural = require("natural");
var tSet = require('../uw-data/uw-definitions.json');
var tBuild = require('../uw-data/uw-buildings.json');
var idData = tBuild.data;
var misc = tSet.misc;

classifier = new natural.BayesClassifier();

// associate all building names with their codes
for (var k = 0; k < idData.length; k++) {
    classifier.addDocument(idData[k].building_name.toString(), idData[k].building_code.toString());
    classifier.addDocument(idData[k].building_code.toString(), idData[k].building_code.toString());
}

classifier.addDocument(misc.atm[0], misc.atm[1]);
classifier.addDocument(misc.course[0], misc.course[1]);
classifier.addDocument(misc.food[0], misc.food[1]);

classifier.train();

classifier.save('classifier.json');

console.log(classifier.classify('MC'));
console.log(classifier.classify('Health building'));