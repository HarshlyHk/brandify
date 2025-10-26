import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                // This is where we handle the login logic
                await dbConnect();

                // Find the user in the database
                const user = await User.findOne({
                    email: credentials.email,
                }).select("+password"); // We must explicitly select the password

                if (!user) {
                    throw new Error("No user found with this email");
                }

                // Check if the password matches
                const isMatch = await user.matchPassword(credentials.password);

                if (!isMatch) {
                    throw new Error("Invalid password");
                }

                // Return the user object (without the password)
                return {
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    isAdmin: user.isAdmin,
                };
            },
        }),
    ],
    callbacks: {
        // This callback is called when a JWT is created or updated
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        // This callback is called when a session is checked
        session: async ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login", // We will create a custom login page at /login
    },
});
