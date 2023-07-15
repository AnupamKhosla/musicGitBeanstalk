'use strict';

// const supertest = require('supertest'); 
// const test = require('unit.js');
// const app = require('../server.js');


//convert requires to imports
import supertest from 'supertest';
import test from 'unit.js';
import app from '../server.js';
import { PORT } from '../server.js';
import { promises as fs } from 'fs';

console.log(process.env);
throw new Error('test');


(async () => {    
    if(!!process.env.PARTITION) { //you might use NODE_ENV
      await fs.writeFile('./frontend/src/config.js', `export const baseUrl = 'musicsheets.in:${PORT}';`);
    }
    else {
      await fs.writeFile('./frontend/src/config.js', `export const baseUrl = 'localhost:${PORT}';`);
    }
})();



const request = supertest(app);

describe('Tests app', function() {
  it('verifies get', function(done) {
    request.get('/').expect(200).end(function(err, result) {
      test.string(result.text).contains('Musicsheets');
      test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');      
      done(err);
    });
  });
});
