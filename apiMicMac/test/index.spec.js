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

describe('app', function () {
  it('should return a valid response', function () {
    return request(app)
      .get('/point3d/aaa.jpg/1,1/1,5/1,6')
      .expect(200)
      .then((res) => {
        console.log(res)
        expect(res.type).to.be.equal('application/xml')
      })
      .catch((err) => expect(err).to.be.undefined)
  })
})

describe('app', function () {
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

describe('app', function () {
  it('should return a valid response', function () {
    return request(app)
      .get('/point2d/aaa.jpg/1,1/1,5')
      .expect(200)
      .then((res) => {
        expect(res.type).to.be.equal('application/xml')
      })
      .catch((err) => expect(err).to.be.undefined)
  })
})

describe('app', function () {
  it('should return an invalid parameter(s) response', function () {
    return request(app)
      .get('/point2d/aaa.jpg/1,1/1')
      .expect(400)
      .then((res) => {
      })
      .catch((err) => expect(err).to.be.undefined)
  })
})
