// importing user info
import UserInfo from '@/components/UserInfo'
// importing HomeStats
import HomeStats from "@/components/HomeStats"
// importing icons
import { AiFillBell } from "react-icons/ai";
import { AiFillFolder } from "react-icons/ai";


export default function Dashboard() {
    return (
        <div>
            <div className='w-full py-2 flex border-b border-light-gray'>
                <h4 className='w-1/3 font-bold uppercase'>DashBoard</h4>
                <div className='w-2/3 flex items-center justify-end gap-5'>
                    <div className='cursor-pointer'><AiFillBell size={25} /></div>
                    <div className='cursor-pointer'><AiFillFolder size={25}  /></div>
                </div>
             </div>
            <UserInfo />
            <HomeStats />
        </div>
    )
}

