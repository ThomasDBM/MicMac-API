'use strict';


/**
 * Create calibration file from metadata
 * Returns xml file describing calibration
 *
 * imgURL String URL of the image
 * pP List Principal point
 * f Long Focal
 * szIm List Size of the image
 * cdist List Distorsion coefficient
 * returns Calibration
 **/
exports.getCalib = function(imgURL,pP,f,szIm,cdist) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "NameIn" : "NameIn",
  "CalibrationInternConique" : [ {
    "PP" : [ 0, 0 ],
    "F" : 6.027456183070403,
    "KnownConv" : "KnownConv",
    "SzIm" : [ 1, 1 ],
    "CalibDistorsion" : [ {
      "Cdist" : 5.962133916683182
    }, {
      "Cdist" : 5.962133916683182
    } ]
  }, {
    "PP" : [ 0, 0 ],
    "F" : 6.027456183070403,
    "KnownConv" : "KnownConv",
    "SzIm" : [ 1, 1 ],
    "CalibDistorsion" : [ {
      "Cdist" : 5.962133916683182
    }, {
      "Cdist" : 5.962133916683182
    } ]
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

