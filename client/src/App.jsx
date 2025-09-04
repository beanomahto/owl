import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Home from "./pages/Home.jsx";
import Syllabus from "./pages/Syllabus.jsx";

import { createContext, useState } from "react";

export const MyContext = createContext();

const App = () => {
  const [branch, setBranch] = useState(null);
  const [flag, setFlag] = useState(false);
  const [subjects, setSubjects] = useState(null);
  const [paper, setPaper] = useState(null);
  const [semester, setSemester] = useState("");
  const [data, setData] = useState(null);
  const [branches, setBranches] = useState(null);
  const [semesters, setSemesters] = useState(null);

  return (
    <div>
      <MyContext.Provider
        value={{
          branch,
          setBranch,
          flag,
          setFlag,
          subjects,
          setSubjects,
          paper,
          setPaper,
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
          <div className="flex">
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
    // <div className="w-64 h-screen bg-gray-800 text-white p-4">
    //   <h2 className="text-xl font-bold mb-4">Sidebar</h2>
    //   <ul className="space-y-2">
    //     <li>
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li>
    //       <Link to="/main">Pyq</Link>
    //     </li>
    //     <li>
    //       <Link to="/syllabus">Syllabus</Link>
    //     </li>
    //   </ul>
    // </div>

    <div className="group relative h-screen bg-gray-800 text-white transition-all duration-300 w-16 hover:w-56">
      <div className="p-4 flex items-center">
        <span className="text-2xl">🔥</span>
        <span className="ml-3 text-lg font-bold opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500">
          My App
        </span>
      </div>
      <ul className="mt-6 space-y-4">
        <li className="flex items-center p-2">
          <span>🏠</span>
          <span className="ml-3 hidden group-hover:block">
            <Link to="/">Home</Link>
          </span>
        </li>
        <li className="flex items-center p-2">
          <span>📄</span>
          <span className="ml-3 hidden group-hover:block">
            <Link to="/main">Pyq</Link>
          </span>
        </li>
        <li className="flex items-center p-2">
          <span>📞</span>
          <span className="ml-3 hidden group-hover:block">
            <Link to="/syllabus">Syllabus</Link>
          </span>
        </li>
      </ul>
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="flex-1 h-screen bg-gray-200 p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/syllabus" element={<Syllabus />} />
      </Routes>
    </div>
  );
};

export default App;
