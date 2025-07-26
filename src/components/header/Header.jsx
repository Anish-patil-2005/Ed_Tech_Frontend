import { Link } from "react-router-dom";


const Header = ({isAuth}) => {

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-3xl font-bold text-purple-700 ">E-Learning</div>

      {/* Navigation Links */}
      <nav className="space-x-6 text-lg font-medium text-gray-700">
        <Link to="/" className="hover:text-purple-700 transition">Home</Link>
        <Link to="/courses" className="hover:text-purple-700 transition">Courses</Link>
        <Link to="/about" className="hover:text-purple-700 transition">About</Link>
        {
          isAuth ? (
            <Link to="/accounts" className="hover:text-purple-700 transition">Accounts</Link>
          ):(
            <Link to="/login" className="hover:text-purple-700 transition">Login</Link>
          )
        }
      </nav>
    </header>
  );
};

export default Header;
