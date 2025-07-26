import { Link, useNavigate } from "react-router-dom";
import './auth.css';
import Button from "../../components/Button";
import { useState } from "react";
import { UserData } from "../../contexts/UserContext";

const Verify = () => {
  const [otp,setOtp] = useState("");
  const {btnLoading, verifyOtp} = UserData();
  const navigate = useNavigate();
  
  const submitHandler = async (e)=>{
    e.preventDefault();
    await verifyOtp (Number(otp),navigate)
  }

  return (
    <div className="flex items-center justify-center bg-white h-[80vh]">
      <div className="bg-white p-5 shadow-md text-center w-[300px]">
        <h2 className="text-2xl text-purple-700 mb-4">Verify Account</h2>
        
        <form onSubmit={submitHandler} className="text-left">
          <label htmlFor="otp" className="block mb-1 text-[14px] text-zinc-500">
            Otp
          </label>
          <input
            id="otp"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            type="number"
            required
            className="w-[92%] p-[3px] mb-[15px] border border-gray-300 rounded-[5px]"
          />

          <button disabled={btnLoading} className="bg-[#8a4baf] text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-[#5f357e] transition-colors duration-300" type='submit'>
                    {btnLoading? "Please wait...": "Verify"}
          </button>

        </form>

        <p className="text-sm text-gray-600 mt-4">
          Go to
          <Link to="/login" className="text-purple-600 hover:underline ml-1">
            Login
          </Link>{" "}
          page
        </p>
      </div>
    </div>
  );
};

export default Verify;
