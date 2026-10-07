import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req) {
    try {
        // frontend sends email and password when a user registers
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

        // check if a user with this email already exists
        const existing = await db.collection("users").findOne({ email });
        // if email is already registered, return error
        if (existing) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 400 }
            );
        }


        // insert a new user document into the users collection
        await db.collection("users").insertOne({
            email,
            password,
            createdAt: new Date()
        });
        // frontend will redirect user to the login page
        return NextResponse.json({ status: "ok" });

    } catch (err) {
        // log error to console and return generic 500 error
        console.error("REGISTER ERROR:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}