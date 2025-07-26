import {Link, useNavigate} from "react-router-dom"
import './auth.css'
import Button from "../../components/Button"
import { useState } from "react"
import { UserData } from "../../contexts/UserContext"

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {btnLoading, loginUser} = UserData();

    const submitHandler = async(e)=>{
        e.preventDefault(); // do not reload the page once click on submit
        await loginUser(email,password,navigate);
    }

  return (
    // auth page
    <div className="flex items-center justify-center bg-white h-[80vh]">
        {/* auth form */}
        <div className="bg-white p-5 shadow-md text-center w-[300px]">
            <h2 className="text-2xl text-purple-700 mb-4">Login</h2>
            <form onSubmit={submitHandler} className="text-left" >
                <label className="block mb-1 text-[14px] text-zinc-500" htmlFor="email">Email</label>
                <input 
                    className="w-[92%] p-[3px] mb-[15px] border-1 border-solid rounded-[5px] " 
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />

                <label className="block mb-1 text-[14px] text-zinc-500" htmlFor="password">Password</label>
                <input 
                    className="w-[92%] p-[3px] mb-[15px] border-1 border-solid rounded-[5px] " 
                    type="password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />

                <button disabled={btnLoading} className="bg-[#8a4baf] text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-[#5f357e] transition-colors duration-300" type='submit'>
                    {btnLoading?"Please wait...":"Login"}
                </button>
            </form>
            <p className="text-sm text-gray-600 mt-4">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-purple-600 hover:underline ml-1">
                    Register
                </Link>
            </p>

        </div>
    </div>
  )
}

export default Login
