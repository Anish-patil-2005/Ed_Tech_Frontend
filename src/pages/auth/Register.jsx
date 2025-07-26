import { Link, useNavigate } from "react-router-dom";
import './auth.css';
import Button from "../../components/Button";
import { useState } from "react";
import { UserData } from "../../contexts/UserContext";

const Register = () => {
  const navigate = useNavigate();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {btnLoading, registerUser} = UserData();

    const submitHandler = async(e)=>{
        e.preventDefault(); // do not reload the page once click on submit
        await registerUser(name,email,password,navigate);
    }

  return (
    <div className="flex items-center justify-center bg-white h-[80vh]">
      <div className="bg-white p-5 shadow-md text-center w-[300px]">
        <h2 className="text-2xl text-purple-700 mb-4">Register</h2>
        <form onSubmit={submitHandler} className="text-left">
          <label htmlFor="name" className="block mb-1 text-[14px] text-zinc-500">
            Name
          </label>
          <input 
            className="w-[92%] p-[3px] mb-[15px] border-1 border-solid rounded-[5px] " 
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <label htmlFor="email" className="block mb-1 text-[14px] text-zinc-500">
            Email
          </label>
          <input 
            className="w-[92%] p-[3px] mb-[15px] border-1 border-solid rounded-[5px] " 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="block mb-1 text-[14px] text-zinc-500">
            Password
          </label>
          <input 
            className="w-[92%] p-[3px] mb-[15px] border-1 border-solid rounded-[5px] " 
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button disabled={btnLoading} className="bg-[#8a4baf] text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-[#5f357e] transition-colors duration-300" type='submit'>
                    {btnLoading?"Please wait...":"Register"}
                </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
