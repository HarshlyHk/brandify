import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    // --- DEBUG LOG 1 ---
    console.log("Register API hit. Method:", method);

    if (method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        // --- DEBUG LOG 3 ---
        console.log("Validation failed: Fields are missing!");
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    await dbConnect();

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        console.log("Creating new user...");
        const user = await User.create({
            name,
            email,
            password,
        });

        console.log("User created successfully:", user._id);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.error("SERVER ERROR:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
