import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';
import Editor from "../../components/Editor";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summaryWordCount, setSummaryWordCount] = useState(0);
  const [summaryError, setSummaryError] = useState("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const navigate = useNavigate();

  const handleSummaryChange = (e) => {
    const newSummary = e.target.value;
    setSummary(newSummary);

    const wordCount = newSummary.trim().split(/\s+/).length;
    setSummaryWordCount(wordCount);

    if (wordCount > 50) {
      setSummaryError("Summary cannot be more than 50 words.");
    } else {
      setSummaryError("");
    }
  };

  const generateAISummary = async () => {
    if (!title) {
      toast.error("Please enter a title first");
      return;
    }

    setIsGeneratingSummary(true);
    try {
      const response = await fetch("http://localhost:3000/ai/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      setSummary(data.summary);
      setSummaryWordCount(data.summary.trim().split(/\s+/).length);
      toast.success("Summary generated successfully!");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const generateAIContent = async () => {
    if (!title || !summary) {
      toast.error("Please enter both title and summary first");
      return;
    }

    setIsGeneratingContent(true);
    try {
      const response = await fetch("http://localhost:3000/ai/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, summary }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      setContent(data.content);
      toast.success("Content generated successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content");
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const createNewPost = async (e) => {
    e.preventDefault();
    if (summaryWordCount > 50) {
      toast.error("Please fix the summary length issue before submitting.");
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    
 
    try {
      const response = await fetch("http://localhost:3000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Post created successfully");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("An error occurred while creating the post");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create a New Post</h1>
      <form onSubmit={createNewPost} className="space-y-6">
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
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={summary}
              onChange={handleSummaryChange}
              placeholder="Summary"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={generateAISummary}
              disabled={isGeneratingSummary}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 flex items-center"
            >
              {isGeneratingSummary ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Generating...
                </>
              ) : (
                'AI Generate'
              )}
            </button>
          </div>
          <p className="text-red-500 text-sm mt-1">{summaryError}</p>
          <p className="text-gray-500 text-sm mt-1">Word count: {summaryWordCount}</p>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Upload Cover Image</label>
          <input
            type="file"
            required
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Content</label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={generateAIContent}
              disabled={isGeneratingContent}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 flex items-center"
            >
              {isGeneratingContent ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Generating Content...
                </>
              ) : (
                'Generate AI Content'
              )}
            </button>
          </div>
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
              Creating Post...
            </>
          ) : (
            'Create Post'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
