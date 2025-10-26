import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast"; // <-- 1. IMPORT TOAST

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // We don't need the 'error' state anymore, toast will handle it
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        // --- 2. WRAP YOUR API CALL IN A TOAST.PROMISE ---
        const registrationPromise = fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                // If server returns an error, throw an error to the promise
                throw new Error(data.message || "Something went wrong");
            }
            return data; // This data goes to the toast.success block
        });

        // --- 3. THIS IS THE TOAST UI ---
        await toast.promise(registrationPromise, {
            loading: "Creating your account...",
            success: (data) => {
                router.push("/login"); // Redirect on success
                return "Registered successfully! Please log in."; // Success message
            },
            error: (err) => {
                return err.message; // Show the specific error from the server
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
                    Create Your Account
                </h2>
                {/* We don't need the old error <p> tag here anymore */}
                <form onSubmit={handleSubmit}>
                    {/* ... all your input fields ... (no changes needed here) */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
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
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
