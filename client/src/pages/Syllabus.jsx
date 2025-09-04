import { useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MyContext } from "../App.jsx";

const Syllabus = () => {
  const {
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
  } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/getBranchesAndSemesters`;
        const response = await axios.get(url, {});
        const { semesters, branches } = response.data;
        setBranches(branches);
        setSemesters(semesters);
        //console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setBranch(null);
      setSemester(null);
      setFlag(false);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlag(!flag);
    try {
      const url = `${import.meta.env.VITE_API_URL}/getAllSubjects`;
      const response = await axios.post(url, {
        branch: branch,
        semester: semester,
      });
      setSubjects(response.data);
      console.log("subjects", subjects);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = async (paper) => {
    setPaper(paper);
    console.log("paper", paper);
    const url = `${import.meta.env.VITE_API_URL}/getSyllabusPdf`;
    try {
      const response = await axios.post(url, {
        semester: semester,
        branch: branch,
        subject: paper,
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
    <div className="py-10 px-20 w-full h-screen">
      <div className="flex">
        <div className="mx-auto text-4xl mb-10 font-bold">syllabus</div>
      </div>
      {!flag ? (
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4 border rounded-md"
          >
            {/* Branch Dropdown */}
            <div>
              <label className="block mb-1">Branch</label>
              <select
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Branch</option>
                {branches &&
                  branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
              </select>
            </div>

            {/* Semester Dropdown */}
            {semesters && (
              <div>
                <label className="block mb-1">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                  }}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Semester</option>
                  {semesters.map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Submit Button */}
            {
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            }
          </form>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4">
            {subjects &&
              Object.values(subjects).map((paper, idx) => (
                <button
                  key={idx}
                  className="h-32 bg-gray-100 hover:bg-gray-400 text-gray-900 font-mono text-lg font-bold p-6 rounded-lg shadow flex items-center justify-center" onClick={() => handleClick(paper)}
                >
                  {paper}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Syllabus;
