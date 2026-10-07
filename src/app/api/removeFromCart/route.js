import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(req) {
    try {
        // extract query param
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("id");
        // get the logged-in users email from request headers
        const userEmail = req.headers.get("x-user");

        // validate required productID and email
        if (!productId || !userEmail) {
            return NextResponse.json(
                { error: "Missing product id or user" },
                { status: 400 }
            );
        }

        // MongoDB connection
        const client = new MongoClient(
            "mongodb://root:example@localhost:27017/?authSource=admin"
        );
        await client.connect();
        const db = client.db("app");

        // remove the cart item belonging to this user and product
        const result = await db.collection("cart").deleteOne({
            productId: new ObjectId(productId),
            userEmail,
        });

        // if nothing was deleted, item did not exist in cart
        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: "Item not found in cart" },
                { status: 404 }
            );
        }
        // item successfully removed
        return NextResponse.json({ status: "removed" });

    } catch (err) {
        // log error to console and return generic 500 error
        console.error("REMOVE FROM CART ERROR:", err);
        return NextResponse.json(
            { error: "Server error", detail: err.message },
            { status: 500 }
        );
    }
}