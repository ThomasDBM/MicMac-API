var express = require('express');
var router = express.Router();

const { create } = require('xmlbuilder2');

//global variables
var i;
var div, image, image_width, image_height, image_rendwidth, image_rendheight, image_offsetLeft, image_offsetTop;
var xmlDoc, element1;


/* GET point3d file. */
router.get('/:imgURL/:coordX/:coordY/:coordZ', function(req, res, next) {
  let { imgURL, coordX, coordY, coordZ} = req.params;

  let listX = coordX.split(',').map(elem => parseFloat(elem))
  let listY = coordY.split(',').map(elem => parseFloat(elem))
  let listZ = coordZ.split(',').map(elem => parseFloat(elem))

  if (listX.length != listY.length | listX.length != listZ.length){
    return res.status(400).json({error: 'Invalid parameter(s) : Coordinates size does not match'});
  }

  const root = create()
    .ele('Global')
      .ele('NameIm').txt(imgURL).up()
      .ele('DicoAppuisFlottant');
    
  for (let i = 0; i < listX.length; i++) {
    root.ele('OneAppuisDAF')
    .ele('Pt').txt(listX[i]+" "+listY[i]+" "+listZ[i]).up()
    .ele('NamePt').txt(i+1).up()
    .ele('Incertitude').txt('1 1 1').up().up()
  }   

  const xml = root.end({ prettyPrint: true });    
  console.log(xml)         
  res.send(xml);
    
});

module.exports = router;