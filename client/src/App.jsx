import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Home from "./pages/Home.jsx";
import Syllabus from "./pages/Syllabus.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header className="bg-blue-600 text-white py-6 shadow-md">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">PYQ Bank</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/main">Main</Link>
                </li>
                <li>
                  <Link to="/syllabus">syllabus</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/syllabus" element={<Syllabus />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
