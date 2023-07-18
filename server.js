// DO NOT DELETE COMMENTS
//WHole is being converted from commonJS to ESM
"use strict";
//var express = require('express');
//import express
import express from 'express';
import path from 'node:path';

import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import posts from "./routes/posts.mjs";
import db from "./db/conn.mjs";


const PORT = process.env.PORT || 5050;
const app = express();

const productionDir = path.join(path.resolve(),'frontend/build');
const devDir = path.join(path.resolve(),'frontend/public');

app.use(cors());
app.use(express.static(productionDir)); // for live server use build folder of react frontend
app.use(express.static(devDir)); // for dev server use public folder of react frontend


app.get('/', function(req, res) {
  res.send('Hello World');
});


app.use("/posts", posts);





// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
});




// start the Express server
app.listen(PORT, () => {
  console.log(`Success! backend server is running on port: ${PORT} \n frontend is working at 3000. Use localhost:3000 for developement work`);
  //get server url by making curl request



});

export default app;
//export PORT
export { PORT };