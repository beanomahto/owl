import { motion } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/api`;
        const response = await axios.get(url, {});
        console.log(`render cold start initiation`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <Hero />;
};

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-[#fafaf5] flex items-center justify-center">
      {/* background cubes */}
      <motion.div
        className="w-24 h-24 bg-orange-400 border-4 border-black absolute top-20 left-10"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="w-24 h-24 bg-teal-400 border-4 border-black absolute bottom-20 right-20"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />

      {/* EZCrack box */}
      <motion.div
        className="px-10 py-6 bg-teal-300 border-4 border-black text-6xl font-bold"
        initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
        animate={{ rotate: -2, scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Pathshala
      </motion.div>
    </div>
  );
};

export default Home;
