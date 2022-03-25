const request = require('supertest')
const { expect } = require('chai')
const app = require('../index')

describe('index', function () {
    it('should return a valid response', function () {
        return request(app)
            .get('/docs/')
            .expect(200)
            .then((res) => {
                console.log(res);
                // expect(res.body).to.have.property('version')
                // expect(res.body.version).to.be.a.string
                // expect(res.body.version).to.equal('1.0.0')
            })
            .catch((err) => expect(err).to.be.undefined)
    })
})