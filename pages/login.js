import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast"; // <-- 1. IMPORT TOAST

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- 2. WRAP YOUR SIGNIN CALL IN A TOAST.PROMISE ---
        const loginPromise = signIn("credentials", {
            redirect: false, // We will handle redirect manually
            email,
            password,
        }).then((result) => {
            if (result.error) {
                // If signIn returns an error, throw it
                throw new Error(result.error);
            }
            return result; // Pass the success result to the toast
        });

        // --- 3. THIS IS THE TOAST UI ---
        await toast.promise(loginPromise, {
            loading: "Logging in...",
            success: (result) => {
                router.push("/"); // Redirect to homepage on success
                return "Logged in successfully!";
            },
            error: (err) => {
                // This will show "Invalid credentials" or other errors
                return err.message;
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* ... all your input fields ... (no changes needed here) */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
