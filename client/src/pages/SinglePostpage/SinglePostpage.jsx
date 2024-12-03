import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../../utils/UserContext";
import { Trash2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const SinglePostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userinfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`).then((res) => {
      res.json().then((postinfo) => {
        setPostInfo(postinfo);
      });
    });
  }, [id]);

  const deletePost = async () => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <p className="mb-2">Are you sure you want to delete this post?</p>
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300" 
            onClick={async () => {
              const response = await fetch(`http://localhost:3000/post/${id}`, {
                method: "DELETE",
                credentials: "include",
              });

              if (response.ok) {
                const toastId = toast.success("Post deleted successfully");
                setTimeout(() => {
                  toast.dismiss(toastId);
                }, 2000);
                navigate("/");
              } else {
                toast.error("Failed to delete the post.");
              }
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
  };

  if (!postInfo) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 lg:p-12 bg-primary-light dark:bg-primary-dark rounded-xl shadow-lg">
      <Toaster position="top-right" />
      {/* Title Above the Image */}
      <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark text-center mb-6">
        {postInfo.title}
      </h1>
      
      {/* Hero Image */}
      <div className="relative overflow-hidden rounded-xl mb-8">
        <img
          src={postInfo.cover}
          alt="Post cover"
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Post Info */}
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 dark:text-gray-300 mb-8">
        <time className="text-sm md:text-base">{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="text-sm md:text-base">by @{postInfo.author.username}</div>
      </div>

      {/* Action Buttons */}
      {userinfo.id === postInfo.author._id && (
        <div className="flex space-x-4 mb-6">
          <Link
            className="inline-flex items-center px-6 py-3 bg-accent-light dark:bg-accent-dark text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 shadow-md"
            to={`/edit/${postInfo._id}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit Post
          </Link>
          <button
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
            onClick={deletePost}
          >
            <Trash2 size={20} className="mr-2" />
            Delete Post
          </button>
        </div>
      )}

      {/* Post Content */}
      <div className="prose dark:prose-invert prose-lg max-w-none">
        <div
          className="text-text-light dark:text-text-dark prose-headings:text-text-light dark:prose-headings:text-text-dark prose-a:text-accent-light dark:prose-a:text-accent-dark"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    </div>
  );
};

export default SinglePostPage;
