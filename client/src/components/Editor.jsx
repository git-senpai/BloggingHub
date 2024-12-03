import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
      <style>
        {`
          .ql-editor {
            color: var(--tw-text-opacity-light);
          }
          
          .dark .ql-editor {
            color: #f9fafb;
          }

          .dark .ql-toolbar {
            background-color: #374151;
            border-color: #4B5563;
          }

          .dark .ql-toolbar button,
          .dark .ql-toolbar span {
            color: #f9fafb;
          }

          .dark .ql-toolbar button:hover,
          .dark .ql-toolbar span:hover {
            color: #60a5fa;
          }

          .dark .ql-toolbar .ql-stroke {
            stroke: #f9fafb;
          }

          .dark .ql-toolbar .ql-fill {
            fill: #f9fafb;
          }

          .dark .ql-toolbar button:hover .ql-stroke {
            stroke: #60a5fa;
          }

          .dark .ql-toolbar button:hover .ql-fill {
            fill: #60a5fa;
          }

          .dark .ql-container {
            border-color: #4B5563;
          }
        `}
      </style>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="editor-input"
        theme="snow"
      />
    </div>
  );
};

export default Editor;
