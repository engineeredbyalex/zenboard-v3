import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";


const LoginPage = () => {
    const { data: session, status } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError("Invalid Credentials");
            } else {
                router.push("/"); // Redirect to dashboard upon successful login
            }
        } catch (error) {
            console.log("Error during login: ", error);
            setError("An error occurred during login");
        }
    };

    if (status === "loading") {
        // Return loading indicator or null while session is being fetched
        return null;
    }

    if (session) {
        return (
            <div>
                <p>Welcome, {session.user?.name}</p>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-[#FBFAFD] text-black">
                <div className="shadow-lg p-5 rounded-md bg-[#fff] min-w-[300px] min-h-[400px]">
                    <p className="text-gray-500 text-center border-b border-gray-300 py-2 my-5">Login to <span className="font-bold uppercase">Zenboard</span></p>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
                        <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                        <div className="w-full flex flex-col gap-3">
                            <button  className="w-full bg-blue-500 py-2 px-3 rounded-md text-center cursor-pointer hover:bg-black transition-all ease-in-out">
                                <p className="text-white uppercase font-bold">Login</p>
                            </button>
                          
                        </div>
                        {error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                {error}
                            </div>
                        )}
                        <Link href={"/register"}>
                            <p className="text-sm mt-3 text-right hover:text-blue-500 transition-all ease-in-out">Don`t have an account? <span className="underline">Register</span></p>
                        </Link>
                        <button onClick={() => signIn("credentials", {
                            redirect: false,
                            email: 'test69@test.com',
                            password: 'test1234',
                        })} className="w-full bg-green-500 py-2 px-3 rounded-md text-center cursor-pointer hover:bg-black transition-all ease-in-out">
                            <p className="text-white uppercase font-bold">Test Mode</p>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
};

export default LoginPage;
