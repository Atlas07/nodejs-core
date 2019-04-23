const request = require('supertest');
const server = require('../app');

describe('/get', () => {
  it('should /get all requests', () => {
    return request(server)
      .get('/requests')
      .expect(200)
      .then(res => {
        const json = JSON.parse(res.text);
        expect(json.length).toBe(1);
      })
      .catch(err => console.error(err));
  });

  it('should /get request by id', () => {
    return request(server)
      .get('/requests?id=0')
      .expect(200)
      .then(res => {
        const json = JSON.parse(res.text);

        expect(json.method).toBeDefined();
        expect(json.url).toBeDefined();
        expect(json.date).toBeDefined();
        expect(json.headers).toBeDefined();
      })
      .catch(err => console.log(err));
  });
});
