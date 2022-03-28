const express = require('express')
const router = express.Router()

const { create } = require('xmlbuilder2')

/* GET point3d file. */
router.get('/:imgName/:coordX/:coordY/:coordZ', function (req, res, next) {
  const { imgName, coordX, coordY, coordZ } = req.params

  const listX = coordX.split(',').map(elem => parseFloat(elem))
  const listY = coordY.split(',').map(elem => parseFloat(elem))
  const listZ = coordZ.split(',').map(elem => parseFloat(elem))

  if (listX.length !== listY.length | listX.length !== listZ.length) {
    return res.status(400).json({ error: 'Invalid parameter(s) : Coordinates size does not match' })
  }

  const root = create()
    .ele('Global')
    .ele('NameIm').txt(imgName).up()
    .ele('DicoAppuisFlottant')

  for (let i = 0; i < listX.length; i++) {
    root.ele('OneAppuisDAF')
      .ele('Pt').txt(listX[i] + ' ' + listY[i] + ' ' + listZ[i]).up()
      .ele('NamePt').txt(i + 1).up()
      .ele('Incertitude').txt('1 1 1').up().up()
  }

  const xml = root.end({ prettyPrint: true })
  res.send(xml)
})

module.exports = router
