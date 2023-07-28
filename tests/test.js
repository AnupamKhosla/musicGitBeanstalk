'use strict';

//convert requires to imports
import supertest from 'supertest';
import test from 'unit.js';
import app from '../server.js';

//echo all env vars
console.log(process.env);

const request = supertest(app);

describe('Tests app', function() {
  it('verifies get', function(done) {
    request.get('/').expect(200).end(function(err, result) {
      //test.string(result.text).contains('Musicsheets');
      //test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');      
      done(err);
    });
  });
});
