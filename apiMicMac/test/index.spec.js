/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')

describe('app', function () {
  it('should return a valid response', function () {
    return request(app)
      .get('/')
      .expect(200)
      .then((res) => {
      })
      .catch((err) => expect(err).to.be.undefined)
  })
})

describe('/GET point3d', function () {
  it('should return a valid response', function () {
    return request(app)
      .get('/point3d/aaa.jpg/1,1/1,5/1,6')
      .expect(200)
      .then((res) => {
        expect(res.type).to.be.equal('application/xml')
      })
      .catch((err) => expect(err).to.be.undefined)
  })
  it('should return an invalid parameter(s) response', function () {
    return request(app)
      .get('/point3d/aaa.jpg/1,1/1,5/1')
      .expect(400)
      .then((res) => {
        expect(res.body).to.have.property('error')
      })
      .catch((err) => expect(err).to.be.undefined)
  })
})

describe('/GET point2d', function () {
  it('should return a valid response', function () {
    return request(app)
      .get('/point2d/aaa.jpg/1,1/1,5')
      .expect(200)
      .then((res) => {
        expect(res.type).to.be.equal('application/xml')
      })
      .catch((err) => expect(err).to.be.undefined)
  })
  it('should return an invalid parameter(s) response', function () {
    return request(app)
      .get('/point2d/aaa.jpg/1,1/1')
      .expect(400)
      .then((res) => {
      })
      .catch((err) => expect(err).to.be.undefined)
  })
})

describe('/GET calib', function () {
  it('should return a valid response', function () {
    return request(app)
      .get('/calib/aa.jpg/jkjfd/4,5/5/5,1/2,5')
      .expect(200)
      .then((res) => {
        expect(res.type).to.be.equal('application/xml')
      })
      .catch((err) => expect(err).to.be.undefined)
  })
  it('should return an invalid parameter(s) response (PP)', function () {
    return request(app)
      .get('/calib/aa.jpg/jkjfd/4/5/5,1/2,5')
      .expect(400)
      .then((res) => {
      })
      .catch((err) => expect(err).to.be.undefined)
  })
  it('should return an invalid parameter(s) response (F)', function () {
    return request(app)
      .get('/calib/aa.jpg/jkjfd/4,5/5,4/5,1/2,5')
      .expect(400)
      .then((res) => {
      })
      .catch((err) => expect(err).to.be.undefined)
  })
  it('should return an invalid parameter(s) response (SizeIm)', function () {
    return request(app)
      .get('/calib/aa.jpg/jkjfd/4,5/5/5/2,5')
      .expect(400)
      .then((res) => {
      })
      .catch((err) => expect(err).to.be.undefined)
  })
  it('should return an invalid parameter(s) response (Cdist)', function () {
    return request(app)
      .get('/calib/aa.jpg/jkjfd/4,5/5/5,1/2,5,4')
      .expect(400)
      .then((res) => {
      })
      .catch((err) => expect(err).to.be.undefined)
  })
})

const xml = `<file>
<point2d>
  <SetOfMesureAppuisFlottants>
    <MesureAppuiFlottant1Im>
      <NameIm>1957_DUR_452_0018.jpg</NameIm>
      <OneMesureAF1I>
        <NamePt>1</NamePt>
        <PtIm>1471.795847750865 2633.5</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>2</NamePt>
        <PtIm>3269.6782006920416 2580.653846153846</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>3</NamePt>
        <PtIm>2723.2629757785467 1946.5</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>4</NamePt>
        <PtIm>4027.6089965397923 2052.1923076923076</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>5</NamePt>
        <PtIm>114.57093425605537 2492.576923076923</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>6</NamePt>
        <PtIm>114.57093425605537 1876.0384615384614</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>7</NamePt>
        <PtIm>2000.5847750865053 3655.1923076923076</PtIm>
      </OneMesureAF1I>
    </MesureAppuiFlottant1Im>
  </SetOfMesureAppuisFlottants>
</point2d>
<point3d>
  <Global>
    <NameIm>1957_DUR_452_0018.jpg</NameIm>
    <DicoAppuisFlottant>
      <OneAppuisDAF>
        <Pt>4200682.673662597 170102.52820035137 4780412.859818916</Pt>
        <NamePt>1</NamePt>
        <Incertitude>1 1 1</Incertitude>
      </OneAppuisDAF>
      <OneAppuisDAF>
        <Pt>4200575.969989285 170149.40234847006 4780505.986931802</Pt>
        <NamePt>2</NamePt>
        <Incertitude>1 1 1</Incertitude>
      </OneAppuisDAF>
      <OneAppuisDAF>
        <Pt>4200676.371436174 169992.2282104918 4780422.506733829</Pt>
        <NamePt>3</NamePt>
        <Incertitude>1 1 1</Incertitude>
      </OneAppuisDAF>
      <OneAppuisDAF>
        <Pt>4200548.88597794 170026.1852884512 4780535.979618701</Pt>
        <NamePt>4</NamePt>
        <Incertitude>1 1 1</Incertitude>
      </OneAppuisDAF>
    </DicoAppuisFlottant>
  </Global>
</point3d>
<calib>
  <ExportAPERO>
    <NameIn>1957_DUR_452_0018</NameIn>
    <CalibrationInternConique>
      <KnownConv>eConvApero_DistM2C</KnownConv>
      <PP>2547 1832</PP>
      <F>7075</F>
      <SzIm>5094 3664</SzIm>
      <CalibDistortion>
        <ModRad>
          <CDist>2547 1832</CDist>
        </ModRad>
      </CalibDistortion>
    </CalibrationInternConique>
  </ExportAPERO>
</calib>
<url>http://search-engine.alegoria-project.fr/api/v0_1/images/1957_DUR_452_0018
</url>
</file>`

const xmlIncorrect = `<file>
<point2d>
  <SetOfMesureAppuisFlottants>
    <MesureAppuiFlottant1Im>
      <NameIm>1957_DUR_452_0018.jpg</NameIm>
      <OneMesureAF1I>
        <NamePt>1</NamePt>
        <PtIm>1471.795847750865 2633.5</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>2</NamePt>
        <PtIm>3269.6782006920416 2580.653846153846</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>3</NamePt>
        <PtIm>2723.2629757785467 1946.5</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>4</NamePt>
        <PtIm>4027.6089965397923 2052.1923076923076</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>5</NamePt>
        <PtIm>114.57093425605537 2492.576923076923</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>6</NamePt>
        <PtIm>114.57093425605537 1876.0384615384614</PtIm>
      </OneMesureAF1I>
      <OneMesureAF1I>
        <NamePt>7</NamePt>
        <PtIm>2000.5847750865053 3655.1923076923076</PtIm>
      </OneMesureAF1I>
    </MesureAppuiFlottant1Im>
  </SetOfMesureAppuisFlottants>
</point2d>
<point3d>
  <Global>
    <NameIm>1957_DUR_452_0018.jpg</NameIm>
    <DicoAppuisFlottant>
      <OneAppuisDAF>
        <Pt>4200682.673662597 170102.52820035137 4780412.859818916</Pt>
        <NamePt>1</NamePt>
        <Incertitude>1 1 1</Incertitude>
      </OneAppuisDAF>
      <OneAppuisDAF>
        <Pt>4200575.969989285 170149.40234847006 4780505.986931802</Pt>
        <NamePt>2</NamePt>
        <Incertitude>1 1 1</Incertitude>
      </OneAppuisDAF>
      <OneAppuisDAF>
        <Pt>4200676.371436174 169992.2282104918 4780422.506733829</Pt>
        <NamePt>3</NamePt>
        <Incertitude>1 1 1</Incertitude>
      </OneAppuisDAF>
      <OneAppuisDAF>
        <Pt>4200548.88597794 170026.1852884512 4780535.979618701</Pt>
        <NamePt>4</NamePt>
        <Incertitude>1 1 1</Incertitude>
      </OneAppuisDAF>
    </DicoAppuisFlottant>
  </Global>
</point3d>
<calib>
  <ExportAPERO>
    <NameIn>1957_DUR_452_0018</NameIn>
    <CalibrationInternConique>
      <KnownConv>eConvApero_DistM2C</KnownConv>
      <PP>2547 1832</PP>
      <F>7075</F>
      <SzIm>5094 3664</SzIm>
      <CalibDistortion>
        <ModRad>
          <CDist>2547 1832</CDist>
        </ModRad>
      </CalibDistortion>
    </CalibrationInternConique>
  </ExportAPERO>
</calib>
<url>http://search-engine.alegoria-project.fr/api/v0_1/images/1957_DUR_452_0018.iokhfsuiehfi
</url>
</file>`

// const body = parseXML(str)

describe('/POST aspro', function () {
  it('should return a valid response', function () {
    return request(app)
      .post('/aspro/1957_DUR_452_0018.jpg')
      .set('content-type', 'application/xml')
      .send(xml)
      .expect(200)
      .then((res) => {
      })
      .catch((err) => expect(err).to.be.undefined)
  })
  it('should return an invalid parameter(s) response (no body)', function () {
    return request(app)
      .post('/aspro/1957_DUR_452_0018.jpg')
      .expect(400)
      .then((res) => {
      })
      .catch((err) => expect(err).to.be.undefined)
  })
  it('should return an invalid parameter(s) response (no body)', function () {
    return request(app)
      .post('/aspro/1957_DUR_452_0018.jpg')
      .set('content-type', 'application/xml')
      .send(xmlIncorrect)
      .expect(400)
      .then((res) => {
      })
      .catch((err) => expect(err).to.be.undefined)
  })
})
