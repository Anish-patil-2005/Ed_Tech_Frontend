import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../contexts/CourseContext";
import { useEffect } from "react";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (
    user &&
    user.role !== "admin" &&
    !user.subscription.includes(params.id)
  ) {
    navigate("/");
  }

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <>
      {course && (
        <div className="max-w-3xl mx-auto p-4 m-1 bg-white rounded-2xl shadow-md mt-6 space-y-4">
          <img
            src={`${server}/${course.image}`}
            alt={course.title}
            className="w-full h-64 object-cover rounded-xl shadow-sm"
          />
          <h2 className="text-3xl font-bold text-gray-800">{course.title}</h2>
          <p className="text-lg text-gray-600">{course.description}</p>
          <p className="text-sm text-gray-500 italic">by {course.createdBy}</p>
          <p className="text-sm text-gray-500">Duration: {course.duration} weeks</p>
          <Link
            to={`/lectures/${course._id}`}
            className="inline-block mt-4 px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            Go to Lectures
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
