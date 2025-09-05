import { useEffect, useContext } from "react";
import { MyContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const Output = () => {
  const {
    branch,
    setBranch,
    flag,
    setFlag,
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
  } = useContext(MyContext);
  const navigate = useNavigate();
  const handleClick = async (s) => {
    setSubject(s);
    navigate(`/home/${semester}/${branch}/${s}`);
  };
  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-6">
        {subjects &&
          Object.values(subjects).map((s, idx) => (
            <button
              key={idx}
              className="p-6 bg-teal-400 border-4 border-black rounded-xl 
                         shadow-[6px_6px_0px_black] text-lg font-extrabold 
                         hover:translate-x-1 hover:translate-y-1 
                         hover:shadow-[2px_2px_0px_black] 
                         transition-all duration-200"
              onClick={() => handleClick(s)}
            >
              {s}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Output;
