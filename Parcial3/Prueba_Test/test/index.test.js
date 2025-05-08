// test/index.test.js
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

// Configuramos chai con chai-http
chai.use(chaiHttp);

describe('Pruebas con Chai HTTP', () => {
  it('GET /usuario debe responder con nombre Juan', function(done) {
    // Usamos this para evitar problemas con las funciones flecha
    chai.request(app)
      .get('/usuario')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ nombre: 'Juan' });
        done();
      });
  });
});