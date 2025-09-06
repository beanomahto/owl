import { motion } from "framer-motion";
const Diaries = () => {
  return (
    <div className="relative min-h-screen bg-[#fafaf5] flex items-center justify-center">
      <motion.div
        className="px-10 py-6  border-4 border-black text-6xl font-bold"
        initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
        animate={{ rotate: -2, scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        comming soon
      </motion.div>
    </div>
  );
};

export default Diaries;
