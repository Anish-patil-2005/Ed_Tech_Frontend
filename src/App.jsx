import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/home/Home'
import Header from "./components/header/Header"
import Login from "./pages/auth/Login"
import Verify from "./pages/auth/Verify"
import Register from "./pages/auth/Register"
import Footer from "./components/footer/Footer.jsx"
import About from "./pages/about/About.jsx"
import Account from "./pages/account/Account.jsx"
import { UserData } from "./contexts/UserContext.jsx"
import Loading from "./components/loading/Loading.jsx"
import Courses from "./pages/courses/Courses.jsx"
import CourseDescription from "./pages/coursedescription/CourseDescription.jsx"
import PaymentSuccess from "./pages/payment-success/PaymentSuccess.jsx"
import Dashboard from "./pages/dashboard/Dashboard.jsx"
import CourseStudy from "./pages/coursestudy/CourseStudy.jsx"
import Lecture from "./pages/lectures/Lecture.jsx"
import AdminDashboard from "./admin/dashboard_admin/AdminDashboard.jsx"
import AdminCourses from "./admin/courses/AdminCourses.jsx"
import AdminUsers from "./admin/users/AdminUsers.jsx"
 
const App = () => {
  const {isAuth, user, loading} = UserData();
  return (
    <>
      {loading ? <Loading/> :<BrowserRouter>
      <Header isAuth={isAuth}/>
          <Routes>
              <Route path="/" element ={<Home/>} />
           <Route path="/login" element={isAuth?<Home/>: <Login/>}/>
              <Route path="/register" element={isAuth?<Home/>: <Register/>}/>
              <Route path="/verify" element={isAuth?<Home/>: <Verify/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/accounts" element={isAuth ? <Account user={user}/>: <Login/>}/>
              <Route path="/courses" element={ <Courses/>}/>
              <Route path="/course/:id" element={isAuth ? <CourseDescription user={user}/>:<Login/>}/>
              <Route path="/payment-success/:id" element={isAuth ? <PaymentSuccess user={user}/> : <Login/>}/>
              <Route path="/:id/dashboard" element={isAuth ? <Dashboard user={user}/> : <Login/>}/>
              <Route path="/course/study/:id" element={isAuth ? <CourseStudy user={user}/> : <Login/>}/>
              <Route path="/lectures/:id" element={isAuth ?<Lecture user={user}/>: <Login/>}/>
              <Route path="/admin/dashboard" element={isAuth ? <AdminDashboard user={user}/> : <Login/>}/>
              <Route path="/admin/courses" element={isAuth ? <AdminCourses user={user}/> : <Login/>}/>
              <Route path="/admin/users" element={isAuth ?<AdminUsers user={user}/> : <Login/>}/>
          </Routes> 
      <Footer/> 
      </BrowserRouter>}
    </>
  )
}

export default App
