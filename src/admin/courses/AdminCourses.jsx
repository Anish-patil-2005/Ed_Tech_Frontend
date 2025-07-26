/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect,useState } from "react";
import Layout from "../utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../contexts/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";


const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence"
];


const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== "admin") return navigate("/");

  const { courses, fetchCourses } = CourseData();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setimagePrev] = useState('');
  const [btnLoading,setbtnLoading] =useState(false);


  const submitHandler = async(e)=>{
    setbtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title",title);
    myForm.append("description",description);
    myForm.append("category",category);
    myForm.append("price",price);
    myForm.append("duration",duration);
    myForm.append("createdBy",createdBy);
    myForm.append("file",image);

    try {
      const {data} = await axios.post(`${server}/api/course/new`,myForm,{
        headers:{
          token:localStorage.getItem('token')
        }
      });

      toast.success(data.message);
      setbtnLoading(false);

      setTitle('');
      setCategory('');
      setPrice('');
      setDuration('');
      setimagePrev('');
      setImage('');
      setCreatedBy('');
      setDescription('');

      await fetchCourses();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
  setbtnLoading(false); // 🔁 Also ensure button re-enables on error
    }

    
  }

  const changeImageHandler = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend =()=>{
      setimagePrev(reader.result);
      setImage(file);
    }
  }


  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-6 py-4">
        {/* Left Side: Courses */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-[#8a4baf] mb-4">
            Admin Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses && courses.length > 0 ? (
              courses.map((element) => (
                <CourseCard key={element._id} course={element} />
              ))
            ) : (
              <p className="text-gray-600">No courses yet</p>
            )}
          </div>
        </div>

        {/* Right Side: Reserved */}
       <div className="add-course">
  <div className="course-form">
    <h2 className="text-lg font-semibold text-[#8a4baf] mb-4 border-b pb-2">
      Add Course
    </h2>
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input 
          type="text" 
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8a4baf] focus:border-[#8a4baf]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input 
          type="text" 
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8a4baf] focus:border-[#8a4baf]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input 
          type="number" 
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8a4baf] focus:border-[#8a4baf]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Created By</label>
        <input 
          type="text" 
          value={createdBy}
          onChange={(e)=>setCreatedBy(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8a4baf] focus:border-[#8a4baf]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select 
          value={category} 
          onChange={e=>setCategory(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white focus:ring-[#8a4baf] focus:border-[#8a4baf]"
        >
          <option value="">Select Category</option>
          {categories.map((e)=>(<option key={e} value={e}>{e}</option>))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Duration (in weeks)</label>
        <input 
          type="number" 
          value={duration}
          onChange={(e)=>setDuration(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8a4baf] focus:border-[#8a4baf]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
          name="image"
          onChange={changeImageHandler}
          required
          className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#8a4baf] file:text-white hover:file:bg-[#7a3c99] transition"
        />
        {imagePrev && <img src={imagePrev} alt="Preview" className="mt-2 rounded-lg shadow-md w-60" />}
      </div>

      <div>
        <button
          disabled={btnLoading}
          type="submit"
          className="w-full bg-[#8a4baf] text-white py-2 px-4 rounded-md hover:bg-[#7a3c99] transition disabled:opacity-50"
        >
          {btnLoading ? "Please wait..." : "Add"}
        </button>
      </div>
    </form>
  </div>
</div>

      </div>
    </Layout>
  );
};

export default AdminCourses;
