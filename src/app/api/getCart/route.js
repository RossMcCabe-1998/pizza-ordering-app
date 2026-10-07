import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(req) {
    try {
        // get the logged‑in users email from the request headers
        const userEmail = req.headers.get("x-user");
        // if no user is logged in, return empty cart
        if (!userEmail) {
            return NextResponse.json({ items: [] });
        }

        // MongoDB connection
        const client = new MongoClient(
            "mongodb://root:example@localhost:27017/?authSource=admin"
        );
        await client.connect();
        const db = client.db("app");

        // query cart collection for items belonging to this user
        const items = await db.collection("cart").find({ userEmail }).toArray();

        // return the cart items to the frontend as JSON
        return NextResponse.json({ items });

    } catch (err) {
        // log error to console and return generic 500 error
        console.error("GET CART ERROR:", err);
        return NextResponse.json(
            { error: "Server error", detail: err.message },
            { status: 500 }
        );
    }
}
