import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(req) {
    // extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // get the logged‑in users email from the request headers
    const userEmail = req.headers.get("x-user");

    // MongoDB connection
    const client = new MongoClient(
        "mongodb://root:example@localhost:27017/?authSource=admin"
    );
    await client.connect();
    const db = client.db("app");

    // find the specific order by userEmail, order _id
    const order = await db
        .collection("orders")
        .findOne({ _id: new ObjectId(id), userEmail });

    // return the order to the frontend as JSON
    return NextResponse.json({ order });
}