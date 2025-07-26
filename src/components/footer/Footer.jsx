import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 text-center">
      <div className="max-w-4xl mx-auto px-4">
        {/* Text content */}
        <p className="text-gray-700 text-sm mb-4">
          &copy; 2025 Your E-learning Platform. All rights reserved.
          <br />
          Made with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/anish-patil-256269281/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anish Patil
          </a>
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 text-gray-600 text-xl">
          <a href="" className="hover:text-blue-500 transition">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/anish-patil-256269281/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition"
          >
            <FaLinkedin />
          </a>
          {/*To make links open in a new tab, you should add:
                target="_blank" rel="noopener noreferrer"*/}
          {/*  Why rel="noopener noreferrer"?
                noopener prevents the new page from accessing window.opener, improving security.
                noreferrer hides the referrer info from the new page.
        */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
