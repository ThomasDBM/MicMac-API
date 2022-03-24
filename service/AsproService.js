'use strict';


/**
 * Launch MicMac command aspro
 * Calculate orientation file of the image
 *
 * imgURL String URL of the image
 * autoCal byte[] Calibration file
 * appui byte[] Point of appui 2d file
 * gcp byte[] Point of appui 2d file
 * returns Orientation
 **/
exports.getOrientation = function(imgURL,autoCal,appui,gcp) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : "id"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

