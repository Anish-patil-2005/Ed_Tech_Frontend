import React from 'react';
import { CourseData } from '../../contexts/CourseContext';
import CourseCard from '../../components/coursecard/CourseCard';

const Dashboard = ({ user }) => {
  const { mycourse } = CourseData();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome, <span className="text-purple-600">{user.name}</span>!
          </h1>
          <p className="text-gray-600">Here’s your learning dashboard</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            All Enrolled Courses
          </h2>
          {mycourse && mycourse.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mycourse.map((element) => (
                <CourseCard key={element._id} course={element} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No courses enrolled yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
