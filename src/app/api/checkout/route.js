import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req) {
    try {
        // get the logged‑in users email from the request headers
        const userEmail = req.headers.get("x-user");
        // if no user is logged in, block checkout
        if (!userEmail) {
            return NextResponse.json(
                { error: "Not logged in" },
                { status: 401 }
            );
        }

        // read the checkout form data from the request body
        const body = await req.json();
        const { address, first, last, phone } = body;

        // address is required to place an order
        if (!address) {
            return NextResponse.json(
                { error: "Missing address" },
                { status: 400 }
            );
        }

        // MongoDB connection
        const client = new MongoClient(
            "mongodb://root:example@localhost:27017/?authSource=admin"
        );
        await client.connect();
        const db = client.db("app");

        // load all cart items belonging to the logged‑in user
        const cartItems = await db
            .collection("cart")
            .find({ userEmail })
            .toArray();

        // prevent checkout if the cart is empty
        if (cartItems.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            );
        }

        // create a new order document
        // captures the cart contents at the moment of checkout
        const order = await db.collection("orders").insertOne({
            userEmail,
            first,
            last,
            phone,
            address,
            items: cartItems,
            createdAt: new Date(),
        });

        // clear the cart after successful order
        await db.collection("cart").deleteMany({ userEmail });
        // return order ID so the frontend can show confirmation
        return NextResponse.json({ orderId: order.insertedId });

    } catch (err) {
        // log error to console and return generic 500 error
        console.error("CHECKOUT ERROR:", err);
        return NextResponse.json(
            { error: "Server error", detail: err.message },
            { status: 500 }
        );
    }
}