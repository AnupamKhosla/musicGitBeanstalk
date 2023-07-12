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
console.log("success loading db");



var PORT = process.env.PORT || 3000;
var app = express(),

// __dirname is path.resolve()
//publicDir = path.join(__dirname,'public');
publicDir = path.join(path.resolve(),'public');


app.use(cors());
app.use(express.static(publicDir));

//app.use(express.json());

// Load the /posts routes
app.use("/posts", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Success! Server is running on port: ${PORT}`);
});

export default app;