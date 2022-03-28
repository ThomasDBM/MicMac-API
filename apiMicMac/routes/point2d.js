const express = require('express')
const router = express.Router()

const { create } = require('xmlbuilder2')

/* GET point2d file. */
router.get('/:imgName/:coordX/:coordY/', function (req, res, next) {
  const { imgName, coordX, coordY } = req.params

  const listX = coordX.split(',').map(elem => parseFloat(elem))
  const listY = coordY.split(',').map(elem => parseFloat(elem))

  if (listX.length !== listY.length) {
    return res.status(400).json({ error: 'Invalid parameter(s) : Coordinates size does not match' })
  }
  const root = create()
    .ele('SetOfMesureAppuisFlottants')
    .ele('MesureAppuiFlottant1Im')
    .ele('NameIm').txt(imgName).up()

  for (let i = 0; i < listX.length; i++) {
    root.ele('OneMesureAF1I')
      .ele('NamePt').txt(i + 1).up()
      .ele('PtIm').txt(listX[i] + ' ' + listY[i]).up().up()
  }
  const xml = root.end({ prettyPrint: true })
  res.send(xml)
})

module.exports = router
