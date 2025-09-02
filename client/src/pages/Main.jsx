import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Main = () => {
  const [branch, setBranch] = useState(null);
  const [flag, setFlag] = useState(false);
  const [subjects, setSubjects] = useState(null);
  const [paper, setPaper] = useState(null);
  const [semester, setSemester] = useState("");
  const [data, setData] = useState(null);
  const[branches,setBranches]=useState(null);
  const[semesters,setSemesters]=useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/getBranchesAndSemesters`;
        const response = await axios.get(url, {});
        const{semesters,branches}=response.data;
        setBranches(branches);
        setSemesters(semesters);
        //console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
      console.log("subjects",subjects);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = async (paper) => {
    setPaper(paper);
    console.log("paper", paper);
    const url = `${import.meta.env.VITE_API_URL}/getPaper`;
    try {
      const response = await axios.post(url, {
        branch: branch,
        paper: paper,
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
    <div>
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
          <div>
            {subjects &&
              Object.values(subjects).map((paper, idx) => (
                <div key={idx}>
                  <Button variant="outline" onClick={() => handleClick(paper)}>
                    {paper}
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
