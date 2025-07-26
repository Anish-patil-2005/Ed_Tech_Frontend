/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Layout from '../utils/Layout'
import axios from 'axios'
import { server } from '../../main'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const AdminUsers = ({ user }) => {

    const navigate = useNavigate();
      if (user && user.role !== "admin") return navigate("/");

  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem('token'),
        }
      });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  const updateRole = async (id)=>{
    if(confirm("Are you sure you want to update the Role?"))
    {
        try {
            
            const {data} = await axios.put(`${server}/api/user/${id}`,{},{
                headers:{
                    token: localStorage.getItem("token")
                }
            });

            toast.success(data.message);
            fetchUsers();

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Sr.No.</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Update Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users && users.map((e, i) => (
                <tr key={e._id || i} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4">{e.name}</td>
                  <td className="py-3 px-4">{e.email}</td>
                  <td className="py-3 px-4 capitalize">{e.role}</td>
                  <td className="py-3 px-4">
                    <button onClick={()=>updateRole(e._id)} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 rounded-md transition">
                      Update Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default AdminUsers
