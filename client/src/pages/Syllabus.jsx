import { useEffect, useContext } from "react";
import axios from "axios";

import { MyContext } from "../App.jsx";
import InputForm from "../components/InputForm";

const Syllabus = () => {
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
    // return () => {
    //   setBranch(null);
    //   setSemester(null);
    //   setFlag(false);
    // };
  }, []);

 

  return (
    <div className="py-10 px-20 w-full min-h-screen">
      <div className="flex">
        <div className="mx-auto text-4xl mb-10 font-bold">syllabus</div>
      </div>
      <InputForm />
    </div>
  );
};



export default Syllabus;
