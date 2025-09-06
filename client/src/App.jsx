import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Input from "./pages/Input.jsx";
import Output from "./pages/Output.jsx";
import Final from "./pages/Final.jsx";

import { createContext, useState } from "react";

export const MyContext = createContext();

const App = () => {
  const [semesters, setSemesters] = useState(null);
  const [semester, setSemester] = useState("");
  const [branches, setBranches] = useState(null);
  const [branch, setBranch] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [subject, setSubject] = useState(null);
  const [data, setData] = useState(null);

  return (
    <div>
      <MyContext.Provider
        value={{
          branch,
          setBranch,
          subjects,
          setSubjects,
          subject,
          setSubject,
          semester,
          setSemester,
          data,
          setData,
          branches,
          setBranches,
          semesters,
          setSemesters,
        }}
      >
        <BrowserRouter>
          <div className="flex h-screen">
            <Sidebar />
            <MainContent />
          </div>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="group relative h-full bg-yellow-300 text-black transition-all duration-300 w-16 hover:w-56 border-r-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)]">
      {/* Logo */}
      <div className="p-4 flex items-center">
        <span className="text-2xl">*</span>
        <span className="ml-3 text-lg font-bold opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500">
          dashboard
        </span>
      </div>

      {/* Menu */}
      <ul className="mt-6 space-y-4">
        <li className="flex items-center p-2 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-pink-300 transition">
          <span>1</span>
          <span className="ml-3 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500">
            <Link to="/">Home</Link>
          </span>
        </li>
        <li className="flex items-center p-2 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-green-300 transition">
          <span>2</span>
          <span className="ml-3 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500">
            <Link to="/main">Pyq</Link>
          </span>
        </li>
        <li className="flex items-center p-2 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-blue-300 transition">
          <span>3</span>
          <span className="ml-3 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500">
            <Link to="/home">collection</Link>
          </span>
        </li>
      </ul>
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto p-8 bg-pink-200 border-l-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
      <div className="rounded-xl bg-white border-4 border-black  shadow-[6px_6px_0px_rgba(0,0,0,1)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Input />} />
          <Route path="/home/:semester/:branch" element={<Output />} />
          <Route path="/home/:semester/:branch/:subject" element={<Final />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
