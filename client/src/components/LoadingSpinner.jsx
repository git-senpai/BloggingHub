import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-16 h-16 border-4 border-accent-light dark:border-accent-dark rounded-full border-t-transparent"
      />
    </div>
  );
};

export default LoadingSpinner; 