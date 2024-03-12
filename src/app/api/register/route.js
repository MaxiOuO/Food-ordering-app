import { User } from "@/models/User";
import mongoose from "mongoose";
const bcrypt = require('bcrypt');

export async function POST(req) {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const pass = body.password;

    if (!pass?.length || pass.length < 4) {
        new Error('Password must be at least 4 characters');
        return false;
    }

    const notHashedPassword = pass;
    body.password = bcrypt.hashSync(notHashedPassword, 10);

    const createdUser = await User.create(body)
    return Response.json(createdUser);
}