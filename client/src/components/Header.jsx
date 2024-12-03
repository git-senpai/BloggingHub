import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { ThemeContext } from "../utils/ThemeContext";
import { Sun, Moon, Trash2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";

const Header = () => {
  const { setUserinfo, userinfo } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const logout = () => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <p className="mb-2">Are you sure you want to Logout?</p>
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300" 
            onClick={() => {
              performLogout();
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button 
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300" 
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: 6000 });
  }

  const performLogout = () => {
    fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setUserinfo(null);
        const toastId = toast.success("Logged out successfully");
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 2000);
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      })
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error("An error occurred during logout");
      });
  }

  const email = userinfo?.email;

  useEffect(() => {
    fetch('https://blogg-xs4m.onrender.com/auth/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setUserinfo(data))
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error("Failed to fetch user profile");
      });
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-primary-light dark:bg-primary-dark shadow-md rounded-md transition-colors duration-200"
    >
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="text-2xl font-bold text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition duration-300">
            BloggingHub
          </Link>
        </motion.div>
        <nav className="mt-4 sm:mt-0 flex items-center">
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            onClick={toggleTheme}
            className="mr-4 p-2 rounded-full hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-text-light dark:text-text-dark" />
            ) : (
              <Sun className="w-5 h-5 text-text-light dark:text-text-dark" />
            )}
          </motion.button>
          <ul className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
            {email ? (
              <>
                <li className="mt-1.5">
                  <Link 
                    to="/create" 
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-300"
                  >
                    Create new Post
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={logout} 
                    className="px-3 bg-blue-600 text-white hover:bg-blue-700 py-2 text-sm font-medium rounded-md transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
