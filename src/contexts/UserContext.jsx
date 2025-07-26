import {  createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import {server} from '../main.jsx'
import toast, {Toaster} from 'react-hot-toast'

const UserContext = createContext();

export const UserContextProvider = ({children}) =>{

    const [user, setUser] = useState([]);
    const [isAuth, setisAuth] = useState(false);
    const [btnLoading, setbtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);


    async function loginUser (email,password, navigate) {
        setbtnLoading(true);
        try {
            // to fetch the data -- axios,
            // to give notification -- react-hot-toast
            const res = await axios.post(`${server}/api/user/login`,{email,password}); // res -> data -> messge,token,etc rahege

            toast.success(res.data.message);
            // store token in localstorage
            localStorage.setItem("token",res.data.token);


            setUser(res.data.user);
            setisAuth(true);
            setbtnLoading(false);

            navigate('/'); // navigate to home page

        } catch (error) {
            setbtnLoading(false);
            setisAuth(false);
            toast.error(error.response?.data?.message || "Login failed");
        }
    }

     async function registerUser (name, email,password, navigate) {
        setbtnLoading(true);
        try {
            // to fetch the data -- axios,
            // to give notification -- react-hot-toast
            const res = await axios.post(`${server}/api/user/register`,{name,email,password}); // res -> data -> messge,token,etc rahege

            toast.success(res.data.message);
            // store activation token in localstorage
            localStorage.setItem("activationToken",res.data.activationToken);
            setbtnLoading(false);
            navigate('/verify'); // navigate to verify page

        } catch (error) {
            setbtnLoading(false);
            toast.error(error.response?.data?.message || "Registration failed");
        }
    }

    async function fetchUser () {
        try {

            const {data} = await axios.get(`${server}/api/user/myProfile`,{
                headers:{
                    token : localStorage.getItem('token')
                },
            });

            setisAuth(true);
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function verifyOtp(otp,navigate) {
        const activationToken = localStorage.getItem("activationToken");
        try {
            const { data } = await axios.post(`${server}/api/user/verify`,{
                otp,
                activationToken,
            });
            
            toast.success(data.message);
            navigate('/login');
            localStorage.clear();

        } catch (error) {
            setbtnLoading(false);
            toast.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        fetchUser()
    }, [])
    

    return <UserContext.Provider value={{fetchUser,user,setUser,setisAuth,isAuth,loginUser,btnLoading, loading, registerUser,verifyOtp}}>
        {children}
        <Toaster/>
        </UserContext.Provider>
}


export const UserData = () => useContext(UserContext);

