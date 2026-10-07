import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req) {
    try {
        // frontend sends email and password when the user logs in
        const body = await req.json();
        const { email, password } = body;

        // validate required email, password
        if (!email || !password) {
            return NextResponse.json(
                { error: "Missing email or password" },
                { status: 400 }
            );
        }

        // MongoDB connection
        const client = new MongoClient(
            "mongodb://root:example@localhost:27017/?authSource=admin"
        );
        await client.connect();
        const db = client.db("app");

        // find a user document matching the given email
        const user = await db.collection("users").findOne({ email });
        // if no user found, return error
        if (!user) {
            return NextResponse.json(
                { error: "Email not found" },
                { status: 400 }
            );
        }

        // compare password, if not match return error
        if (user.password !== password) {
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 400 }
            );
        }
        // frontend will store user session to localStorage
        return NextResponse.json({ status: "ok", email });

    } catch (err) {
        // log error to console and return generic 500 error
        console.error("LOGIN ERROR:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}