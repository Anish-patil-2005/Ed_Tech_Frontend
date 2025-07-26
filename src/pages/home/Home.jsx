import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Testimonials from "../../components/testimonials/Testimonials";


const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* home */}
      <div className="bg-[#f5f5f5] p-[100px] pl-0 pr-0 text-center">
        {/* home-content */}
        <div className="max-w-[800px] mt-0 mb-0 m-auto">
          <h1 className="text-[36px] mb-[20px] max-md:text-[28px] ">Welcome to our E-Learning Platform !</h1>
          <p className="text-[18px] text-[#666] max-md:text-[16px]">Learn, Grow, Excel</p>
          <Button className="p-5" onclick={()=>navigate("/courses")} button_name={"Get Started"}/>
        </div>
      </div>
      <Testimonials/>
    </div>
  )
}

export default Home
