import { useNavigate } from "react-router-dom";
import { UserData } from "../../contexts/UserContext";
import { server } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../contexts/CourseContext";
const CourseCard = ({ course }) => {
  const {user, isAuth} = UserData();
  const navigate = useNavigate();
  const {fetchCourses} = CourseData()

  const deleteHandler = async (id)=>{
    if(confirm("Are you sure you want to delete this course ?"))
    {
      try {
      const {data} = await axios.delete(`${server}/api/course/${id}`,{
        headers:{
          token :localStorage.getItem('token')
        },
      });

      toast.success(data.message);
      fetchCourses();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    }
  }

  return (
    // coursecard
    <div className="bg-white shadow-md hover:shadow-2xl hover:shadow-purple-300 p-5 rounded-[10px] text-center w-[250px] transition-all duration-500">
      <img
        src={`${server}/${course.image}`}
        alt="course image"
        className="w-full h-[150px] object-cover rounded-[10px] mb-[10px]"
      />
      <h3 className="text-[18px] text-[#333] mb-[10px]">{course.title}</h3>
      <p className="text-[14px] text-[#666] mb-[5px]">
        Instructor- {course.createdBy}
      </p>
      <p className="text-[14px] text-[#666] mb-[5px]">
        Duration- {course.duration} weeks
      </p>
      <p className="text-[14px] text-[#666] mb-[5px]">Price-₹{course.price}</p>
      {isAuth ? (
        <>
        {user && user.role !=='admin' ? (
          <>
             {Array.isArray(user.subscription) && user.subscription.includes(course._id)  ? (
              <button onClick={()=>navigate(`/course/study/${course._id}`)} className="bg-[#8a4baf] text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-[#5f357e] transition-colors duration-300">
                Study
              </button>
              ):(
                <button onClick={()=>navigate(`/course/${course._id}`)} className="bg-[#8a4baf] text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-[#5f357e] transition-colors duration-300">
                  Get Started
                </button>
              )}
          </>
        
        ):(
          <button onClick={()=>navigate(`/course/study/${course._id}`)} className="bg-[#8a4baf] text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-[#5f357e] transition-colors duration-300">
            Study
          </button>
        )}
        </>):(<button onClick={()=>navigate(`/login`)}  className="bg-[#8a4baf] text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-[#5f357e] transition-colors duration-300">
        Get Started
      </button>)}

        {
          user && user.role === "admin" && (
            <div>
              <button onClick={()=>deleteHandler(course._id)} className="bg-red-500 text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-red-600 transition-colors duration-300">
              Delete
            </button>
            </div> 
          )
        }

    </div>
  );
};

export default CourseCard;
