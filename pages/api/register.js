import { connectMongoDB } from "@/lib/mongodb";
import { Account } from "@/models/Account";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    try {
        const { name, email, password } = await req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB()

        // Save user data to the database
        await Account.create({ name, email, password: hashedPassword });

        // Respond with success message
        res.status(201).json({ message: "User registered." });
    } catch (error) {
        console.log(error);
        // Respond with error message
        res.status(500).json({ message: "An error occurred while registering the user." });
    }
}
