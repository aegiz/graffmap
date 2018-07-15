// test environment
process.env.NODE_ENV = 'test';

const app = require('../app');
const request = require('supertest')(app);

describe('Example unit test', function() {
  // this.timeout(15000);

  it('should return 404 page', (done) => {
    request
      .get('/random-url')
      .expect(404, done);
  });

  it('should return home page', (done) => {
    request
      .get('/')
      .expect(200, done);
  });
  it('should return some graffs', () => {
    return request
      .get('/api/graff/close?lng=-0.227777&lat=51.5138448&dist=10000')
      .expect(function(res) {
        console.log('res.body => ',res.body);
      })
  });
});
