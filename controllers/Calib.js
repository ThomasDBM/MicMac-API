'use strict';

var utils = require('../utils/writer.js');
var Calib = require('../service/CalibService');

module.exports.getCalib = function getCalib (req, res, next, imgURL, pP, f, szIm, cdist) {
  Calib.getCalib(imgURL, pP, f, szIm, cdist)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
