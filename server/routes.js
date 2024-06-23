const express = require("express");
// create an instance of a router
const router = express.Router();
const { ObjectId } = require("mongodb");

const { getConnectedClient } = require("./database");

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("giftsdb").collection("GiftsCollection");
    return collection;
  };
//module.exports = { getCollection };

//Get /gifts
router.get("/gifts", async (req, res) => {
    const collection = getCollection();
    const gifts = await collection.find({}).toArray();
    res.status(200).json(gifts)
});

// POST /gifts
router.post("/gifts", async(req, res) => {
    const collection = getCollection();
    let { gift } = req.body;

    if (!gift){
        return res.status(400).json({mssg:"No gift found"});
    }

    gift = (typeof gift === "string") ? gift : JSON.stringify(gift);

    const newGift = await collection.insertOne({ gift, status: false });

    res.status(201).json({gift, status: false, _id: newGift.insertedId});
});

// DELETE /gifts/:id
router.delete("/gifts/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
  
    const deletedGift = await collection.deleteOne({ _id });
    res.status(200).json(deletedGift);
  })

// PUT /gifts/:id
router.put("/gifts/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;

    if (typeof status !== "boolean") {
        return res.status(400).json({ mssg: "invalid status" });
    }
  
    const updatedGift = await collection.updateOne({ _id }, { $set: { status: !status } });
    res.status(200).json(updatedGift);
  });

module.exports = router;