import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Posts = ({ _id, title, summary, cover, createdAt, author }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="post max-w-4xl mx-auto bg-primary-light dark:bg-primary-dark shadow-lg rounded-lg overflow-hidden mb-8 flex flex-col md:flex-row transition-all duration-200 hover:shadow-2xl border-2 border-transparent hover:border-accent-light dark:hover:border-accent-dark"
    >
      <div className="image md:w-full h-64 md:h-auto overflow-hidden">
        <Link to={`/post/${_id}`}>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-full h-full"
          >
            <img
              src={cover}
              alt="Post Cover"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </Link>
      </div>
      <div className="p-6 flex-1">
        <Link to={`/post/${_id}`}>
          <motion.h2 
            whileHover={{ x: 10 }}
            className="text-2xl font-bold text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300"
          >
            {title}
          </motion.h2>
        </Link>
        <p className="info text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span className="author font-semibold text-text-light dark:text-text-dark">{author.username}</span>
          <span className="ml-4">{formatISO9075(new Date(createdAt))}</span>
        </p>
        <p className="summary text-text-light dark:text-text-dark mt-4 text-base leading-relaxed">
          {summary}
        </p>
        <motion.div
          whileHover={{ x: 10 }}
          className="mt-4"
        >
          <Link
            to={`/post/${_id}`}
            className="inline-flex items-center text-accent-light dark:text-accent-dark hover:text-blue-800 dark:hover:text-blue-400 font-semibold transition-colors"
          >
            Read More 
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              className="ml-2"
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Posts;
