import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(req) {
    try {
        const userEmail = req.headers.get("x-user");

        if (!userEmail) {
            return NextResponse.json({ orders: [] });
        }

        const client = new MongoClient(
            "mongodb://root:example@localhost:27017/?authSource=admin"
        );

        await client.connect();
        const db = client.db("app");

        const orders = await db
            .collection("orders")
            .find({ userEmail })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ orders });

    } catch (err) {
        console.error("GET ORDERS ERROR:", err);
        return NextResponse.json(
            { error: "Server error", detail: err.message },
            { status: 500 }
        );
    }
}