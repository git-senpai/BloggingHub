import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (username.length < 4) {
      toast.error("Username must be at least 4 characters long.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const register = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://blogginghub-5pp8.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (response.ok) {
        const toastId = toast.success("Registration successful");
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 2000);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.msg}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      toast.error("An error occurred while trying to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[400px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Your Blog Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your details to start your blogging journey
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-600">
            <p className="text-lg">Registering...</p>
            <svg className="animate-spin w-8 h-8 mx-auto text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="none" stroke="currentColor" strokeWidth="4" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
            </svg>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={register}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
