/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../contexts/CourseContext";
import { useEffect } from "react";
import { server } from "../../main";
import { UserData } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { fetchCourses, fetchCourse, course,fetchMyCourse } = CourseData();
  const { fetchUser } = UserData();
  const [loading, setLoading] = useState(false);

  const checkoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      console.log(params.id);
      const res = await axios.post(
        `${server}/api/course/checkout/${params.id}`.replace(
          /([^:]\/)\/+/g,
          "$1"
        ),
        {},
        {
          headers: {
            token,
          },
        }
      );

      if (!res?.data?.order) {
        throw new Error("Order details not received from server.");
      }

      const order = res.data.order;

      const options = {
        key: "rzp_test_R7xOW9JqGH5yqj", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits.
        currency: "INR",
        name: "E -Learning", //your business name
        description: "Test Transaction",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1,

        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            // payment verification
            const verifyRes = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: {
                  token,
                },
              }
            );

            if (!verifyRes?.data) {
              throw new Error("No data received from payment verification.");
            }

            const veridata = verifyRes.data;

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(veridata.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_order_id}`);
          } catch (error) {
            toast.error(
  error?.response?.data?.message || error.message || "Payment verification failed."
);

            setLoading(false);
          }
        },

        theme: {
          color: "#8a4baf",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Checkout failed.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id, fetchCourse]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="p-4 m-2 max-w-3xl mx-auto bg-white shadow-md rounded-md">
              {/* course header */}
              <div className="mb-4">
                <img
                  src={`${server}/${course.image}`}
                  alt="Course"
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-1">
                  Instructor: {course.createdBy}
                </p>
                <p className="text-gray-600 mb-1">
                  Duration: {course.duration} weeks
                </p>
                <p className="text-gray-600 mb-1">{course.description}</p>
              </div>

              <p className="text-xl font-medium text-gray-800 mb-4">
                Let’s get started with this course at{" "}
                <span className="text-purple-700 font-bold">
                  ₹{course.price}
                </span>
              </p>

              {user &&
              Array.isArray(user?.subscription) &&
              user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="bg-[#8a4baf] text-white px-6 py-2 rounded text-[18px] hover:bg-[#5f357e] transition-colors duration-300"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={checkoutHandler}
                  className="bg-[#8a4baf] text-white px-6 py-2 rounded text-[18px] hover:bg-[#5f357e] transition-colors duration-300"
                >
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
