import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are necessary.");
            return;
        }

        try {
            // Check if user already exists
            const resUserExists = await axios.post("/api/userExists", { email });

            if (resUserExists.data.user) {
                setError("User already exists.");
                return;
            }

            // Register user if user doesn't exist
            const resRegister = await axios.post("/api/register", { name, email, password });

            if (resRegister.status === 201) {
                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    };

    return (
        <div>
           
            <div className="flex items-center justify-center h-screen w-full text-[#595959]">
                <div className="shadow-lg p-5 rounded-md  min-w-[300px] min-h-[400px]">
                    <p className="my-5">Register to <span className="font-bold uppercase">Zenboard</span></p>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
                        <input className="w-full py-2 px-3 bg-transparent border-[#595959] border-[0.1rem]" placeholder="Nume" type="text" onChange={(e) => setName(e.target.value)} />
                        <input className="w-full py-2 px-3 bg-transparent border-[#595959] border-[0.1rem]" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                        <input className="w-full py-2 px-3 bg-transparent border-[#595959] border-[0.1rem]" placeholder="Parola" type="password" onChange={(e) => setPassword(e.target.value)} />
                        <button className="w-full bg-blue-500 py-2 px-3 rounded-md text-center cursor-pointer hover:bg-black transition-all ease-in-out">
                            <p className="text-white uppercase font-bold">
                                Register
                            </p>
                        </button>
                        {error && (
                            <div className="bg-red-500 text-white w-full text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                        )}
                        <Link href={"/"}>
                            <p className=" mt-3 text-right  transition-all ease-in-out">
                                Already have an account ? <span className="underline">Login</span>
                            </p>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
