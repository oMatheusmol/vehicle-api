/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { assert } = require('chai');
const supertest = require('supertest');
const nock = require('nock');
const Vehicle = require('../src/models/Vehicle');
const index = require('../src/index');

describe('Testes:', () => {
  it('Teste-unitario', () => {
    const body = {
      placa: '6565',
      chassi: 5656,
      renavam: 65656,
      modelo: 'ferrari',
      marca: 'ferrari',
      ano: 2021,
    };
    const result = new Vehicle(body);
    assert.strictEqual(result.placa, Number(body.placa));
    assert.strictEqual(result.chassi, Number(body.chassi));
    assert.strictEqual(result.renavam, Number(body.renavam));
    assert.strictEqual(result.modelo, body.modelo);
    assert.strictEqual(result.marca, body.marca);
    assert.strictEqual(result.ano, String(body.ano));
  });

  it('Post ferrari', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .post('/vehicle')
      .send({
        placa: '111',
        chassi: 111,
        renavam: 111,
        modelo: 'ferrari1',
        marca: 'ferrari',
        ano: 2021,
      })
      .expect(201)
      .end(done);
  });

  it('Post fail', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .post('/vehicle')
      .send({
        placa: '111',
        chassi: 111,
      })
      .expect(405)
      .end(done);
  });

  it('Patch chassi 111 to 222', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .patch('/vehicle/update/111')
      .send({
        placa: '111',
        chassi: 222,
        renavam: 111,
        modelo: 'ferrari1',
        marca: 'ferrari',
        ano: 2021,
      })
      .expect(301)
      .end(done);
  });

  it('Patch fail', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .patch('/vehicle/update/fail')
      .send({
        placa: '111',
        chassi: 333,
      })
      .expect(401)
      .end(done);
  });

  it('Get /vehicles/ferrari', (done) => {
    supertest(index.server)
      .get('/vehicles/ferrari')
      .expect(226)
      .end(done);
  });

  it('Get chassi 111 fail', (done) => {
    supertest(index.server)
      .get('/vehicles/chassi/ferrari')
      .expect(401)
      .end(done);
  });

  it('Get vehicles', (done) => {
    supertest(index.server)
      .get('/vehicles')
      .expect(302)
      .end(done);
  });

  it('Get no existing route.', (done) => {
    supertest(index.server)
      .get('/fail')
      .expect(404)
      .end(done);
  });

  it('Delete fail', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .delete('/vehicle/delete/222')
      .send()
      .expect(404)
      .end(done);
  });

  it('Delete placa 111', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .delete('/vehicle/delete/111')
      .send()
      .expect(303)
      .end(done);
  });
});
