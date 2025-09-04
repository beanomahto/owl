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
          {/* <SimpleSidebar /> */}
          <div className="flex">
            <div
              className="w-200 h-100 bg-gray-600 text-white"
              // style={{
              //   width: "200px",
              //   height: "100vh",
              //   background: "#333",
              //   color: "white",
              //   // overflowX: "hidden",
              //   // transition: "0.3s",
              //   padding: "20px",
              // }}
            >
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ margin: "15px 0" }}>
                  <Link to="/">Home</Link>
                </li>
                <li style={{ margin: "15px 0" }}>
                  <Link to="/main">Pyq</Link>
                </li>
                <li style={{ margin: "15px 0" }}>
                  <Link to="/syllabus">Syllabus</Link>
                </li>
              </ul>
            </div>
            {/* Main Content */}
            <div
              style={{
                width: "1200px",
                height: "100vh",
                // background: "#676565ff",
                // color: "white",
                // overflowX: "hidden",
                // transition: "0.3s",
                // padding: "100px",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />} />
                <Route path="/syllabus" element={<Syllabus />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
};

const SimpleSidebar = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          height: "100vh",
          background: "#333",
          color: "white",
          overflowX: "hidden",
          transition: "0.3s",
          padding: "20px",
        }}
      >
        {
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ margin: "15px 0" }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ margin: "15px 0" }}>
              <Link to="/main">Pyq</Link>
            </li>
            <li style={{ margin: "15px 0" }}>
              <Link to="/syllabus">Syllabus</Link>
            </li>
          </ul>
        }
      </div>
    </div>
  );
};

export default App;
