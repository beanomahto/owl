import { useState } from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-10 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <h1 className="text-6xl font-extrabold text-yellow-500 drop-shadow-[4px_4px_0px_black]">
          Welcome to पाठशाला
        </h1>
        <p className="mt-6 text-xl font-bold text-black drop-shadow-[2px_2px_0px_white]">
          Your free resource hub 📚
        </p>
      </div>
    </div>
  );
};

export default Home;
