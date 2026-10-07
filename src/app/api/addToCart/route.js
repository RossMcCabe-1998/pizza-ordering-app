import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(req) {
    try {
        // extract query parameters from the request URL
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        // validate a product ID was provided
        if (!id) {
            return NextResponse.json({ error: "Missing product id" }, { status: 400 });
        }

        // Read the logged-in user from the request header
        const userEmail = req.headers.get("x-user");
        if (!userEmail) {
            return NextResponse.json(
                { error: "User not logged in" },
                { status: 401 }
            );
        }

        // MongoDB connection
        const client = new MongoClient(
            "mongodb://root:example@localhost:27017/?authSource=admin"
        );
        await client.connect();
        const db = client.db("app");

        // find the specific product in database collection using its ID
        const product = await db
            .collection("products")
            .findOne({ _id: new ObjectId(id) });

        // return error if the product ID doesn't exist in DB
        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        // insert cart item linked to user
        await db.collection("cart").insertOne({
            userEmail,
            productId: product._id,
            pname: product.pname,
            cost: product.cost,
            description: product.description,
            category: product.category,
            imageUrl: product.imageUrl,
            addedAt: new Date(),
        });

        return NextResponse.json({ status: "ok", added: product.pname });

    } catch (err) {
        // log error to console and return generic 500 error
        console.error("ADD TO CART ERROR:", err);
        return NextResponse.json(
            { error: "Server error", detail: err.message },
            { status: 500 }
        );
    }
}