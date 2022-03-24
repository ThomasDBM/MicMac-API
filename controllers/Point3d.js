'use strict';

var utils = require('../utils/writer.js');
var Point3d = require('../service/Point3dService');

module.exports.get3dPointOfAppuiFile = function get3dPointOfAppuiFile (req, res, next, imgURL, coordPoint3d) {
  Point3d.get3dPointOfAppuiFile(imgURL, coordPoint3d)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
