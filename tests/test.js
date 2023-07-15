'use strict';

// const supertest = require('supertest'); 
// const test = require('unit.js');
// const app = require('../server.js');


//convert requires to imports
import supertest from 'supertest';
import test from 'unit.js';
import app from '../server.js';
import fs from 'fs';
import { PORT } from '../server.js';



const request = supertest(app);

describe('Tests app', function() {
  it('verifies get', function(done) {
    request.get('/').expect(200).end(function(err, result) {
      test.string(result.text).contains('Musicsheets');
      test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');
      if(!!process.env.NODE_ENV) {
        fs.writeFileSync('./frontend/src/config.js', `export const baseUrl = 'musicsheets.in:${PORT}';`);
      }
      else {
        fs.writeFileSync('./frontend/src/config.js', `export const baseUrl = 'localhost:${PORT}';`);
      }
      done(err);
    });
  });
});
