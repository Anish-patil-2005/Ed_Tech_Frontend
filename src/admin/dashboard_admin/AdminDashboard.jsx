/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../utils/Layout';
import { server } from '../../main'
import axios from 'axios';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== 'admin') return navigate('/')

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      setStats(data.stats);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-white ">
      <Layout>
        <div className="max-w-6xl p-5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-100 p-6 rounded-xl shadow-md text-center">
            <p className="text-lg text-gray-700 font-semibold mb-2">Total Courses</p>
            <p className="text-3xl font-bold text-purple-700">{stats.totalCourses}</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-xl shadow-md text-center">
            <p className="text-lg text-gray-700 font-semibold mb-2">Total Lectures</p>
            <p className="text-3xl font-bold text-purple-700">{stats.totalLectures}</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-xl shadow-md text-center">
            <p className="text-lg text-gray-700 font-semibold mb-2">Total Users</p>
            <p className="text-3xl font-bold text-purple-700">{stats.totalUsers}</p>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default AdminDashboard
