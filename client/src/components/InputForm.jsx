import { useContext } from "react";
import { MyContext } from "../App.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InputForm = () => {
  const {
    branch,
    setBranch,
    flag,
    setFlag,
    subjects,
    setSubjects,
    semester,
    setSemester,
    branches,
    semesters,
  } = useContext(MyContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/getAllSubjects/${semester}/${branch}`;
      const response = await axios.get(url);
      if (response.data) {
        setSubjects(response.data);
        navigate(`/home/${semester}/${branch}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 border-4 border-black 
                   shadow-[6px_6px_0px_black] rounded-xl w-full max-w-md
                   space-y-6"
      >
        {/* Branch Dropdown */}
        <div>
          <label className="block mb-2 font-bold text-lg">Branch</label>
          <select
            value={branch || ""}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full px-4 py-3 text-lg font-medium
                       border-2 border-black bg-yellow-200
                       shadow-[4px_4px_0px_black] focus:outline-none
                       focus:ring-4 focus:ring-pink-300"
          >
            <option value="">Select Branch</option>
            {branches &&
              branches.map((b) => (
                <option
                  key={b}
                  value={b}
                  className="px-4 py-2 cursor-pointer hover:bg-yellow-300 font-medium"
                >
                  {b}
                </option>
              ))}
          </select>
        </div>

        {/* Semester Dropdown */}
        {semesters && (
          <div>
            <label className="block mb-2 font-bold text-lg">Semester</label>
            <select
              value={semester || ""}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-4 py-3 text-lg font-medium
                         border-2 border-black bg-green-200
                         shadow-[4px_4px_0px_black] focus:outline-none
                         focus:ring-4 focus:ring-pink-300 "
            >
              <option value="">Select Semester</option>
              {semesters.map((sem) => (
                <option
                  key={sem}
                  value={sem}
                  className="px-4 py-2 cursor-pointer hover:bg-yellow-300 font-medium"
                >
                  {sem}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 text-lg font-bold 
                     bg-pink-200 border-2 border-black 
                     shadow-[5px_5px_0px_black]
                     hover:bg-pink-300 hover:translate-x-[3px] hover:translate-y-[3px]
                     hover:shadow-none transition"
        >
          Submit 🚀
        </button>
      </form>
    </div>
  );
};

export default InputForm;
