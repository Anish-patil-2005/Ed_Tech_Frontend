/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { CourseData } from "../../contexts/CourseContext";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]); // Should store a single lecture
  const [loading, setLoading] = useState(true);
  const [lectureLoding, setLectureLoding] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setbtnLoading] = useState(false);

  //  if(user && user.role !== 'admin' && !user.subscription.includes(params.id)){
  //   return navigate('/');
  // }

  async function fetchLectures() {
    try {
      const response = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      const lecturesData = response.data?.lectures || [];
      setLectures(lecturesData);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching lectures:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLectureLoding(true);
    try {
      const response = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      const lectureData = response.data?.lecture || [];
      setLecture(lectureData);
      setLectureLoding(false);
    } catch (error) {
      console.log(error);
      setLectureLoding(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure want to delete this lecture ?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`,{
          headers:{
            token: localStorage.getItem('token')
          }
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const submitHandler = async (e) => {
    setbtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setbtnLoading(false);
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
      setShow(false);
      fetchLectures();
    } catch (error) {
      toast.error(error.response.data.message);
      btnLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  useEffect(() => {
    if (
      user &&
      user.role !== "admin" &&
      !user.subscription.includes(params.id)
    ) {
      navigate("/");
    }
  }, [user, params.id, navigate]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 min-h-screen">
      {/* Left: Video Display */}
      <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md">
        {lectureLoding ? (
          <Loading />
        ) : lecture.video ? (
          <>
            <video
              src={`${server}/${lecture.video}`}
              width="100%"
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              autoPlay
              className="rounded-lg"
            ></video>
            <h1 className="text-2xl font-bold mt-4">{lecture.title}</h1>
            <p className="text-gray-600 mt-2">{lecture.description}</p>
          </>
        ) : (
          <h1 className="text-xl font-semibold text-center text-gray-500">
            Please Select a Lecture
          </h1>
        )}
      </div>

      {/* Right: Lecture List and Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        {user && user.role === "admin" && (
          <button
            onClick={() => setShow(!show)}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            {show ? "Close" : "Add Lecture +"}
          </button>
        )}

        {show && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Add Lecture</h2>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="border-2 border-purple-300 rounded-lg p-3 cursor-pointer bg-pink-50 hover:bg-pink-100 transition">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Video
                </label>
                <input
                  type="file"
                  name="video"
                  onChange={changeVideoHandler}
                  required
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-purple-500 file:text-white
               hover:file:bg-purple-600 transition"
                />
              </div>

              {videoPrev && (
                <video src={videoPrev} alt="" width={300} controls></video>
              )}

              <button
                disabled={btnLoading}
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                {btnLoading ? "Please wait..." : "Add"}
              </button>
            </form>
          </div>
        )}

        <div className="space-y-2 mt-4">
          {lectures && lectures.length > 0 ? (
            lectures.map((e, i) => (
              <>
                <div
                  key={i}
                  onClick={() => fetchLecture(e._id)}
                  className={` cursor-pointer border px-4 py-2 rounded-lg transition ${
                    lecture._id === e._id
                      ? "bg-purple-100 border-purple-400 text-purple-700 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="font-semibold">{i + 1}.</span> {e.title}
                </div>
                {user && user.role === "admin" && (
                  <button
                    onClick={() => deleteHandler(e._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete {e.title}
                  </button>
                )}
              </>
            ))
          ) : (
            <p className="text-gray-500">No lectures yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lecture;
