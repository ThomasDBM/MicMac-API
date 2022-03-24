'use strict';


/**
 * Create file containing point of appui 2d
 * Returns xml file describing coordinates of point 2d
 *
 * imgURL String URL of the image
 * coordPoint2d List ID of pet that needs to be fetched
 * returns Point2d
 **/
exports.get2dPointOfAppuiFile = function(imgURL,coordPoint2d) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "MesureAppuiFlottant1Im" : [ {
    "OneMesureAF1I" : [ {
      "NamePt" : 0,
      "PtIm" : [ 6, 6 ]
    }, {
      "NamePt" : 0,
      "PtIm" : [ 6, 6 ]
    } ],
    "NameIm" : "NameIm"
  }, {
    "OneMesureAF1I" : [ {
      "NamePt" : 0,
      "PtIm" : [ 6, 6 ]
    }, {
      "NamePt" : 0,
      "PtIm" : [ 6, 6 ]
    } ],
    "NameIm" : "NameIm"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

