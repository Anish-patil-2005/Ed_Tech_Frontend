import Button from "../../components/Button.jsx"
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { UserData } from "../../contexts/UserContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Account = ({user}) => {
        const {setisAuth, setUser} = UserData();

        const navigate = useNavigate();

        const logoutHandler =()=>{
                localStorage.clear();
                setUser([]);
                setisAuth(false);
                toast.success("Logged Out...");
                navigate('/login')
        }

return (
    <div>
            {/* Profile */}
            <div  className="bg-white p-5 rounded-[10px] shadow-md w-full md:w-auto mx-auto mt-0 md:mt-0 md:p-5 sm:w-[80%] sm:mt-[90px]">
                    <h2>My Profile</h2>
                    {/* profile info */}
                    <div className="text-left mt-[15px]">
                            <p className="mb-[10px] text-[#333]">
                                    <strong className="text-[#8a4baf]">Name - {user.name}</strong>
                            </p>

                            <p className="mb-[10px] text-[#333]">
                                    <strong className="text-[#8a4baf]" type="email">Email - {user.email}</strong>
                            </p>

                            <button onClick={()=>navigate(`/${user._id}/dashboard`)}  className="flex items-center bg-[#8a4baf] text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-[#5f357e] transition-colors duration-300"
>                                <MdDashboard/> Dashboard
                            </button>

        {
                user.role==="admin" && (
                <button onClick={()=>navigate(`/admin/dashboard`)}  className="flex items-center bg-[#8a4baf] text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-[#5f357e] transition-colors duration-300"
>                                <MdDashboard/>Admin-Dashboard
                            </button> )
        }
                            

                            <button onClick={logoutHandler}  className="flex items-center bg-red-500 text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-red-600 transition-colors duration-300"
>                                 <IoIosLogOut/>Logout
                            </button>
                    </div>
                    
            </div>

    </div>
)
}

export default Account
