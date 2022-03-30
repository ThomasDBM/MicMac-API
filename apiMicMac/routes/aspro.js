/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const { execSync } = require('child_process')
const convert = require('xml-js')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function OBJtoXML (obj) {
  let xml = ''
  for (const prop in obj) {
    xml += obj[prop] instanceof Array ? '' : '<' + prop + '>'
    if (obj[prop] instanceof Array) {
      for (const array in obj[prop]) {
        xml += '<' + prop + '>'
        xml += OBJtoXML(new Object(obj[prop][array]))
        xml += '</' + prop + '>'
      }
    } else if (typeof obj[prop] === 'object') {
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
  console.log(imgURL)

  const imgName = imgURL.replace('.jpg', '')
  console.log('terminal : ' + process.env.ComSpec)
//   const resHelp = execSync("/var/www/micmac/bin/mm3d aspro 1957_DUR_452_0018.jpg Ori-CalInit gcp_1957_DUR_452_0018.xml appuis_1957_DUR_452_0018.xml", {
//     cwd: '/home/formation/Documents/alegoria/MicMac-API/apiMicMac/workspace'
//   })


//   try {
//     // success command
//     const resNpmVersion = execSync("npm -v");
//     console.log("success", resNpmVersion.toString());

//     // failed command, the result is printed in the catch block
//     const resHelp = execSync("/var/www/micmac/bin/mm3d aspro 1957_DUR_452_0018.jpg Ori-CalInit gcp_1957_DUR_452_0018.xml appuis_1957_DUR_452_0018.xml", {
//         cwd: '/home/formation/Documents/alegoria/MicMac-API/apiMicMac/workspace'
//       })
//   } catch (error) {
//     console.log(error.message);
//     console.log("error", error.stdout.toString());
//   }

  // execSync('mkdir workspace', { encoding: 'utf-8' })

  const point2d = req.body.file.point2d
  const point3d = req.body.file.point3d
  const calib = req.body.file.calib

  const point2dXML = OBJtoXML(point2d)
  const point3dXML = OBJtoXML(point3d)
  const calibXML = OBJtoXML(calib)

  execSync('touch workspace/aa.jpg', { encoding: 'utf-8' })
  execSync(`echo  "${point2dXML}" > workspace/appuis_${imgName}.xml`, { encoding: 'utf-8' })
  execSync(`echo  "${point3dXML}" > workspace/gcp_${imgName}.xml`, { encoding: 'utf-8' })
  execSync(`echo  "${calibXML}" > workspace/Ori-CalInit/AutoCal_Foc-50000_Cam-${imgURL}.xml`, { encoding: 'utf-8' })

  const resHelp = execSync(`/var/www/micmac/bin/mm3d aspro ${imgURL} Ori-CalInit gcp_${imgName}.xml appuis_${imgName}.xml`, {
    cwd: '/home/formation/Documents/alegoria/MicMac-API/apiMicMac/workspace'
  })

  // execSync('rm -R workspace', { encoding: 'utf-8' })
  res.send(resHelp)
})

module.exports = router
