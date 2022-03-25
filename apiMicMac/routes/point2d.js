var express = require('express');
var router = express.Router();

const { create } = require('xmlbuilder2');

//global variables
var i;
var div, image, image_width, image_height, image_rendwidth, image_rendheight, image_offsetLeft, image_offsetTop;
var xmlDoc, element1;


/* GET point2d file. */
router.get('/:imgURL/:coordX/:coordY/', function(req, res, next) {
  let { imgURL, coordX, coordY } = req.params;
  // test coordX.length == coordY.length
  let listX = coordX.split(',').map(elem => parseFloat(elem))
  let listY = coordY.split(',').map(elem => parseFloat(elem))

  if (listX.length != listY.length){
    return res.status(400).json({error: 'Invalid parameter(s) : Coordinates size does not match'});
  }
    const root = create()
    .ele('SetOfMesureAppuisFlottants')
        .ele('MesureAppuiFlottant1Im')
        .ele('NameIm').txt(imgURL).up();
    console.log(listX.length)
    for (let i = 0; i < listX.length; i++) {
        root.ele('OneMesureAF1I')
        .ele('NamePt').txt(i+1).up()
        .ele('PtIm').txt(listX[i]+" "+listY[i]).up().up()
    }   
    const xml = root.end({ prettyPrint: true });             
    res.send(xml);
    
  
});

module.exports = router;
