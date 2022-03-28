const express = require('express')
const router = express.Router()

const { create } = require('xmlbuilder2')

/* GET users listing. */
router.get('/:imgName/:conv/:PP/:F/:szIm/:cDist', function (req, res, next) {
    const { imgName, conv, PP, F, szIm, cDist } = req.params

    const listPP = PP.split(',').map(elem => parseFloat(elem))
    const listSzIm = szIm.split(',').map(elem => parseFloat(elem))
    const listF = F.split(',').map(elem => parseFloat(elem))
    const listCDist = cDist.split(',').map(elem => parseFloat(elem))
  
    if (listPP.length !== 2 | listSzIm.length !== 2 | listF.length !== 1 | listCDist.length !== 2) {
      return res.status(400).json({ error: 'Invalid parameter(s) : attributes size does not match' })
    }
  
    const root = create()
      .ele('ExportAPERO')
      .ele('NameIn').txt(imgName).up()
      .ele('CalibrationInternConique')
      .ele('KnownConv').txt(conv).up()
      .ele('PP').txt(listPP[0]+" "+listPP[1]).up()
      .ele('F').txt(listF[0]).up()
      .ele('SzIm').txt(listSzIm[0]+" "+listSzIm[1]).up()
      .ele('CalibDistortion')
      .ele('ModRad')
      .ele('Cdist').txt(listCDist[0]+" "+listCDist[1]).up()
      .up().up().up()
  
    const xml = root.end({ prettyPrint: true })
    res.type('application/xml')
    res.send(xml)
})

module.exports = router