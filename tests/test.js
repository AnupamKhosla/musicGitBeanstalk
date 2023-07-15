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
      //test.string(result.text).contains('Musicsheets'); // Musicsheets would be in h1 tag and/or logo
      
      //check if hasheader is html
      //test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');

      //convert string to json
      let url = test.value(result).actual.request.url;
      //strip port from url and the trailing slash
      url = url.replace(/:\d+/, '');
      //strip trailing slash if any
      url = url.replace(/\/$/, '');
      console.log('url: ' + url);


      //print current directory
      console.log('current dir: ' + process.cwd());

      fs.writeFileSync('./frontend/src/config.js', `export const baseUrl = '${url}:${PORT}';`);




      done(err);
    });
  });
});
