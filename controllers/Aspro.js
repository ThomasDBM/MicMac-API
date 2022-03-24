'use strict';

var utils = require('../utils/writer.js');
var Aspro = require('../service/AsproService');

module.exports.getOrientation = function getOrientation (req, res, next, imgURL, autoCal, appui, gcp) {
  Aspro.getOrientation(imgURL, autoCal, appui, gcp)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
