//import { PORT } from './server.js';
import fs from 'fs';
import "./loadEnvironment.mjs";

const PORT = process.env.PORT || 5050;

console.log("Wrote baseUrl to frontend/src/config.js");
if(!!process.env.PARTITION) { //you might use NODE_ENV
  fs.writeFileSync('./frontend/src/config.js', `export const baseUrl = 'http://16.171.73.224';`);    
  console.log("Wrote http://16.171.73.224 to config.js");
}
else {
 fs.writeFileSync('./frontend/src/config.js', `export const baseUrl = 'localhost:${PORT}';`);
console.log(`Wrote localhost:${PORT} to config.js`);
}
