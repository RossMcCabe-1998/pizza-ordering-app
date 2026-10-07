import {ObjectId} from "mongodb";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("In the api page")
    // extract query param
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // =================================================
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(uri);

    // MongoDB connection
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db("app");
    const collection = db.collection('products');

    // find single product document by its ObjectId
    const item = await db.collection("products").findOne({
        _id: new ObjectId(id),
    });

    console.log('Found documents :', item);
    // return product to the frontend as JSON
    return Response.json({item})
}