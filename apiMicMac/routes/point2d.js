const express = require('express')
const router = express.Router()

const { create } = require('xmlbuilder2')

/* GET point2d file. */
router.get('/:imgURL/:coordX/:coordY/', function (req, res, next) {
  const { imgURL, coordX, coordY } = req.params
  // test coordX.length == coordY.length
  const listX = coordX.split(',').map(elem => parseFloat(elem))
  const listY = coordY.split(',').map(elem => parseFloat(elem))

  if (listX.length !== listY.length) {
    return res.status(400).json({ error: 'Invalid parameter(s) : Coordinates size does not match' })
  }
  const root = create()
    .ele('SetOfMesureAppuisFlottants')
    .ele('MesureAppuiFlottant1Im')
    .ele('NameIm').txt(imgURL).up()

  for (let i = 0; i < listX.length; i++) {
    root.ele('OneMesureAF1I')
      .ele('NamePt').txt(i + 1).up()
      .ele('PtIm').txt(listX[i] + ' ' + listY[i]).up().up()
  }
  const xml = root.end({ prettyPrint: true })
  res.send(xml)
})

module.exports = router
