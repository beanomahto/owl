import axios from "axios";
import { useEffect, useContext } from "react";
import { MyContext } from "../App.jsx";
const Final = () => {
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
  const type = {
    0: "syllabus",
    1: "mid-1",
    2: "mid-2",
    3: "end",
  };
  const handleClick = async (t) => {
    const url = `${import.meta.env.VITE_API_URL}/getSyllabusPdf`;
    try {
      const response = await axios.post(url, {
        semester: semester,
        branch: branch,
        subject: subject,
        type: t,
      });
      console.log(`response data`, response.data);
      if (response.data && response.data.url) {
        // open pdf in new tab
        window.open(response.data.url, "_blank");
      } else {
        console.log("No PDF URL returned");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-6">
        {Object.values(type).map((t, idx) => (
          <button
            key={idx}
            className="p-6 bg-teal-300 border-4 border-black rounded-xl 
                         shadow-[6px_6px_0px_black] text-lg font-extrabold 
                         hover:translate-x-1 hover:translate-y-1 
                         hover:shadow-[2px_2px_0px_black] 
                         transition-all duration-200"
            onClick={() => handleClick(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Final;
