import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main.jsx";

const CourseContext = createContext({
  courses: [],
  fetchCourses: () => {},
  loading: true,
});

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const [mycourse, setMycourse] = useState([])

  async function fetchCourses() {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/api/course/all`);
      setCourses(res.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCourse (id) {

    try {
      //
      const {data} =await axios.get(`${server}/api/course/${id}`)
      setCourse(data.course);

    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMyCourse () {
    const res = await axios.get(`${server}/api/mycourse`, {
      headers:{
        token: localStorage.getItem('token'),
      }
    });
    
    setMycourse(res.data.courses);
  }

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);

  return (
    <CourseContext.Provider value={{ mycourse,fetchMyCourse,courses, fetchCourses, loading ,fetchCourse, course}}>
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
