'use strict';

var utils = require('../utils/writer.js');
var Point2d = require('../service/Point2dService');

module.exports.get2dPointOfAppuiFile = function get2dPointOfAppuiFile (req, res, next, imgURL, coordPoint2d) {
  Point2d.get2dPointOfAppuiFile(imgURL, coordPoint2d)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
