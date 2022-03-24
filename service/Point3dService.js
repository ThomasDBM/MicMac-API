'use strict';


/**
 * Create file containing point of appui 3d
 * Returns xml file describing coordinates of points 3d
 *
 * imgURL String URL of the image
 * coordPoint3d List ID of pet that needs to be fetched
 * returns Point3d
 **/
exports.get3dPointOfAppuiFile = function(imgURL,coordPoint3d) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "DicoAppuisFlottant" : [ {
    "OneAppuisDAF" : [ {
      "Pt" : [ 0.8008281904610115, 0.8008281904610115 ],
      "Incertitude" : [ 1.4658129805029452, 1.4658129805029452 ],
      "NamePt" : 6
    }, {
      "Pt" : [ 0.8008281904610115, 0.8008281904610115 ],
      "Incertitude" : [ 1.4658129805029452, 1.4658129805029452 ],
      "NamePt" : 6
    } ]
  }, {
    "OneAppuisDAF" : [ {
      "Pt" : [ 0.8008281904610115, 0.8008281904610115 ],
      "Incertitude" : [ 1.4658129805029452, 1.4658129805029452 ],
      "NamePt" : 6
    }, {
      "Pt" : [ 0.8008281904610115, 0.8008281904610115 ],
      "Incertitude" : [ 1.4658129805029452, 1.4658129805029452 ],
      "NamePt" : 6
    } ]
  } ],
  "NameIm" : "NameIm"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

