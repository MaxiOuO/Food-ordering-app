import mongoose from "mongoose";
import { Category } from "@/models/Category";

export async function POST(req) {
    const { name } = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const categoryDoc = await Category.create({ name })
    return Response.json(categoryDoc);
}

export async function PUT(req) {
    const { _id, name } = await req.json();
    await Category.updateOne({ _id }, { name });
    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await Category.find()
    );
}