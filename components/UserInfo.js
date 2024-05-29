import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function UserInfo() {
const{data:session,status} = useSession()

    console.log("Session Status:", status);
    console.log("Session Data:", session);

    return (
        <div className="w-full h-auto mt-2 flex flex-row items-start justify-between">
            <div className="flex flex-col items-start justify-center gap-0">
                <h5> Welcome {session?.user?.name}</h5>
                <p> Welcome, this is the state of your shop:</p>
            </div>
            <div className="flex flex-row items-end justify-center gap-10">
                <button onClick={() => signOut("credentials")} className="w-full bg-red-500 py-2 px-3 rounded-md text-center cursor-pointer hover:bg-black transition-all ease-in-out">
                    <p className="text-white uppercase font-bold">Logout</p>
                </button>
            </div>
        </div>
    );
}
