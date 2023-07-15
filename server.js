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


var PORT = process.env.PORT || 5050;
var app = express(),

publicDir = path.join(path.resolve(),'frontend/build');


app.use(cors());
app.use(express.static(publicDir));

//app.use(express.json());

// Load the /posts routes
app.use("/posts", posts);

//create a file in "frontend/src/config.js" with the content "export const baseUrl = ${domain}:PORT;"
//where domain is the domain name of the hosting provider
//and PORT is the port number of the backend server
//use fs module to create a file
//fs.writeFileSync('./frontend/src/config.js',`export const baseUrl = ${domain}:PORT;`);








// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Success! Server is running on port: ${PORT}`);
  //get server url by making curl request



});

export default app;
//export PORT
export { PORT };