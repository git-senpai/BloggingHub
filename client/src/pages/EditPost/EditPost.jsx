import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../components/Editor";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://blogginghub-5pp8.onrender.com/post/" + id).then((res) => {
      res.json().then((postinfo) => {
        setTitle(postinfo.title);
        setContent(postinfo.content);
        setSummary(postinfo.summary);
      });
    });
  }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);

    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    try {
      const response = await fetch(
        "https://blogginghub-5pp8.onrender.com/post",
        {
          method: "PUT",
          body: data,
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.success("Post updated successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("An error occurred while updating the post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Edit Post</h1>
      <form onSubmit={updatePost} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Summary</label>
          <input
            type="text"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Summary"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Upload Cover Image</label>
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Content</label>
          <Editor value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Updating Post...
            </>
          ) : (
            'Update Post'
          )}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
