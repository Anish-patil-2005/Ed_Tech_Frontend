import CourseCard from '../../components/coursecard/CourseCard';
import Loading from '../../components/loading/Loading';
import { CourseData } from '../../contexts/CourseContext';

const Courses = () => {
  const { courses, loading } = CourseData();

  if (loading) {
    <Loading/>
  }

  return (
    <div className="p-6 min-h-screen flex flex-col bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-purple-500">Available Courses</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {courses && courses.length > 0 ? (
          courses.map((element) => (
            <CourseCard key={element._id} course={element} />
          ))
        ) : (
          <p className="text-gray-500">No courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
