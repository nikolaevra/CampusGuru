/**
 * Created by Ruslan on 6/24/2017.
 */
var tSet = require('./uw-data/uw-buildings.json');
var bData = tSet.data;

exports.searchUW = function (needle, classified) {
    for (var i = 0; i < bData.length; i++) {
        if (bData[i].building_code === needle || bData[i].building_code === classified) {
            var result = "building" + " " + classified;
            return (result);
        }
    }


    return null;
};

