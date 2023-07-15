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

console.log(process.env.NODE_ENV);



// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
});




// start the Express server
app.listen(PORT, () => {
  console.log(`Success! Server is running on port: ${PORT}`);
  //get server url by making curl request



});

export default app;
//export PORT
export { PORT };