import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../utils/UserContext";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserinfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://blogginghub-5pp8.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, email }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Server Error:', data);
        const errorMessage = data.msg || 'Login failed. Please try again.';
        toast.error(errorMessage);
      } else {
        setUserinfo(data);
        toast.success("Login successful");
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Server error. Please try again later.");
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
            Login to Your Blog Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access your blog
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-600">
            <p className="text-lg">Signin...</p>
            <svg className="animate-spin w-8 h-8 mx-auto text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="none" stroke="currentColor" strokeWidth="4" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
            </svg>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={login}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  autoComplete="current-password"
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
                Sign in
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
