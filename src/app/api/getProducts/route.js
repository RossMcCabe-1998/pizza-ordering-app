export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")
    // =================================================
    const { MongoClient } = require('mongodb');
    const url = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(url);

    // extract query param
    const {searchParams} = new URL(req.url);
    const cat = searchParams.get('cat');
    const featured = searchParams.get('featured');

    // MongoDB connection
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db("app");
    const collection = db.collection('products');

    // build filter dynamically
    const filter = {};
    // category filter
    if (cat){
        filter.category = cat;
    }
    // featured filter
    if (featured === true) filter.featured = true;
    if (featured === false) filter.featured = false;

    console.log("Using filter:", filter);
    // query DB with filter
    const findResult = await collection.find(filter).toArray();

    console.log('Found documents =>', findResult);
    // return matching products to the frontend as JSON
    return Response.json(findResult)
}
