import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 songs
router.get("/", async (req, res) => {
  //check for get variables in the url  
  let query = {};
  if (req.query.songName) query.sheetName = {$regex: req.query.songName, $options: "i"};
  if (req.query.artistName) query.Artist = {$regex: req.query.artistName, $options: "i"};
  if (req.query.scaleName) query.scale = {$regex: req.query.scaleName, $options: "i"};
  if (req.query.genre) query.Genres = {$regex: req.query.genre, $options: "i"};
  if (req.query.date) query.date = {$regex: req.query.date, $options: "i"};

  let collection = await db.collection("songs");
  let results = await collection.find(query)
    .limit(50)
    .toArray();


  // let collection = await db.collection("songs");
  // let results = await collection.find({})
  //   .limit(50)
  //   .toArray();

  res.send(results).status(200);
});

// Fetches the latest songs
router.get("/latest", async (req, res) => {
  let collection = await db.collection("songs");
  let results = await collection.aggregate([
    {"$project": {"Artist": 1, "sheetName": 1, "Genres": 1, "scale": 1, "date": 1}},
    {"$sort": {"date": -1}},
    {"$limit": 6}
  ]).toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {  
  let collection = await db.collection("songs");
  let query = {_id: new ObjectId(req.params.id)}; //ObjectId behaviour is changed to include "new" in latest mongodb driver
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("songs");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(newDocument).status(204);
});


//We no longer have comments
// Update the post with a new comment
// router.patch("/comment/:id", async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };
//   const updates = {
//     $push: { comments: req.body }
//   };
//   let collection = await db.collection("songs");
//   let result = await collection.updateOne(query, updates);
//   res.send({ comments: req.body }).status(200);
// });

// Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection = db.collection("songs");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});

export default router;
