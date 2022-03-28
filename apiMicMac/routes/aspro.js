const express = require('express')
const router = express.Router()
const { execSync } = require('child_process')
const convert = require('xml-js')

function OBJtoXML(obj) {
    var xml = '';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "<" + prop + ">";
          xml += OBJtoXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof obj[prop] == "object") {
        xml += OBJtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
  }

/* GET orientation file. */
router.post('/:imgURL/:calib/:point2d/:point3d', function (req, res, next) {
  const output = execSync('pwd', { encoding: 'utf-8' })
  execSync('mkdir workspace', { encoding: 'utf-8' })
  console.log(typeof req.body)
  const xml = OBJtoXML(req.body)
  console.log(typeof xml)
  execSync(`echo  ${xml} > workspace/test`, { encoding: 'utf-8' })
  res.send(output)
  //execSync('rm -R workspace', { encoding: 'utf-8' })
})

module.exports = router
