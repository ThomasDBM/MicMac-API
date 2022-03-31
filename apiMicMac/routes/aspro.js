/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const { execSync } = require('child_process')

function OBJtoXML (obj) {
  let xml = ''
  for (const prop in obj) {
    xml += obj[prop] instanceof Array ? '' : '<' + prop + '>'
    if (obj[prop] instanceof Array) {
      for (const array in obj[prop]) {
        xml += '<' + prop + '>'
        // eslint-disable-next-line no-new-object
        xml += OBJtoXML(new Object(obj[prop][array]))
        xml += '</' + prop + '>'
      }
    } else if (typeof obj[prop] === 'object') {
      // eslint-disable-next-line no-new-object
      xml += OBJtoXML(new Object(obj[prop]))
    } else {
      xml += obj[prop]
    }
    xml += obj[prop] instanceof Array ? '' : '</' + prop + '>'
  }
  xml = xml.replace(/<\/?[0-9]{1,}>/g, '')
  return xml
}

/* GET orientation file. */
router.post('/:imgURL/', function (req, res, next) {
  const { imgURL } = req.params

  const imgName = imgURL.replace('.jpg', '')
  const imgNameForCalib = imgName.replace(/_/g, '')

  const point2d = req.body.file.point2d
  const point3d = req.body.file.point3d
  const calib = req.body.file.calib
  const url = req.body.file.url

  const point2dXML = OBJtoXML(point2d)
  const point3dXML = OBJtoXML(point3d)
  const calibXML = OBJtoXML(calib)

  // Get neccessary files
  execSync(`mkdir -p workspace${imgName}/Ori-CalInit`)
  execSync(`wget -c ${url} -O ${imgURL}`,
    { cwd: `/home/formation/Documents/alegoria/MicMac-API/apiMicMac/workspace${imgName}` })
  execSync(`echo  "${point2dXML}" > workspace${imgName}/appuis_${imgName}.xml`, { encoding: 'utf-8' })
  execSync(`echo  "${point3dXML}" > workspace${imgName}/gcp_${imgName}.xml`, { encoding: 'utf-8' })
  execSync(`echo  "${calibXML}" > workspace${imgName}/Ori-CalInit/AutoCal_Foc-50000_Cam-${imgNameForCalib}.xml`, { encoding: 'utf-8' })

  const micmacChantier = execSync('cat workspace/ORIGINAL_MicMac-LocalChantierDescripteur_original.xml', { encoding: 'utf-8' })
  execSync(`echo "${micmacChantier.replace(/image_name/g, imgName)}" > workspace${imgName}/MicMac-LocalChantierDescripteur.xml`)

  // Execute MicMac command
  execSync(`/var/www/micmac/bin/mm3d aspro ${imgURL} Ori-CalInit gcp_${imgName}.xml appuis_${imgName}.xml`, {
    cwd: `/home/formation/Documents/alegoria/MicMac-API/apiMicMac/workspace${imgName}`
  })

  // Read orientation file
  const orientation = execSync(`cat workspace${imgName}/Ori-Aspro/Orientation-${imgURL}.xml`, { encoding: 'utf-8' })

  res.send(orientation)
  execSync(`rm -R workspace${imgName}`, { encoding: 'utf-8' })
})

module.exports = router
