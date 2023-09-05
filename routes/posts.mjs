import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import "../loadEnvironment.mjs";

const router = express.Router();


//get total number of results
router.get("/count", async (req, res) => {
  let query = {};
  if (req.query.songName) query.sheetName = {$regex: req.query.songName, $options: "i"};
  if (req.query.artistName) query.Artist = {$regex: req.query.artistName, $options: "i"};
  if (req.query.scaleName) query.scale = {$regex: req.query.scaleName, $options: "i"};
  if (req.query.genre) query.Genres = {$regex: req.query.genre, $options: "i"};
  if (req.query.date) query.date = {$regex: req.query.date, $options: "i"};
  let collection = await db.collection("musicsheets");
  let result_count = await collection.find(query).count();
  res.send({"count": result_count}).status(200);
});



// Get a list of 50 musicsheets
router.get("/", async (req, res) => {
  //check for get variables in the url  
  let page = 1;
  let query = {};
  if (req.query.songName) query.sheetName = {$regex: req.query.songName, $options: "i"};
  if (req.query.artistName) query.Artist = {$regex: req.query.artistName, $options: "i"};
  if (req.query.scaleName) query.scale = {$regex: req.query.scaleName, $options: "i"};
  if (req.query.genre) query.Genres = {$regex: req.query.genre, $options: "i"};
  if (req.query.date) query.date = {$regex: req.query.date, $options: "i"};
  if (!!req.query.page) {
    page = parseInt(req.query.page);
  }


  let collection = await db.collection("musicsheets");
  let results = await collection.find(query,  {"sort" : ['date', 'asc']})
    .skip(parseInt(page-1) * 6)
    .limit(6)
    .toArray();


  // let collection = await db.collection("musicsheets");
  // let results = await collection.find({})
  //   .limit(50)
  //   .toArray();

  res.send(results).status(200);
});

// Fetches the latest musicsheets
router.get("/latest", async (req, res) => {
  let collection = await db.collection("musicsheets");
  let results = await collection.aggregate([
    {"$project": {"Artist": 1, "sheetName": 1, "Genres": 1, "scale": 1, "date": 1}},
    {"$sort": {"date": -1}},
    {"$limit": 6}
  ]).toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {  
  let collection = await db.collection("musicsheets");
  let query = {_id: new ObjectId(req.params.id)}; //ObjectId behaviour is changed to include "new" in latest mongodb driver
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("musicsheets");
  let newDocument = req.body;
  newDocument.date = new Date();
  //let result = await collection.insertOne(newDocument); //create functionality stopped for the time being
  res.send(newDocument).status(204);
});


//We no longer have comments
// Update the post with a new comment
// router.patch("/comment/:id", async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };
//   const updates = {
//     $push: { comments: req.body }
//   };
//   let collection = await db.collection("musicsheets");
//   let result = await collection.updateOne(query, updates);
//   res.send({ comments: req.body }).status(200);
// });

// Delete an entry
router.delete("/:id", async (req, res) => {
  if(req.body.pass == process.env.DELETE_KEY){
    let collection = await db.collection("musicsheets");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
  } else {
    res.status(401).send({});
  }
});

export default router;
