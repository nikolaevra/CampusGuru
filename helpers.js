/**
 * Created by Ruslan on 6/24/2017.
 */
var tSet = require('./uw-data/UWDefinitions.json');
var idData = tSet.idData;

exports.searchUW = function (needle, classified) {
    for (var i = 0; i < idData.length; i++) {
        if (idData[i].unit_code === needle || idData[i].unit_code === classified) {
            return ("building");
        }
    }


    return null;
};

