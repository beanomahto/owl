const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const supabase = require("./utility/supabase.js");

app.get("/", (req, res) => {
  res.send(`hello world`);
});

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const branches = ["CSE", "ECE"];
const subjects = {
  CSE: {
    6: ["MATHS", "PHYSICS"],
    7: ["DSA", "OOPS"],
  },
  ECE: {
    6: ["BSP", "COMPUTER NETWORK","VLSI","IOT","MICROWAVE ENGINNERING"],
    7: ["CN", "DIGITAL"],
  },
};

app.get("/getBranchesAndSemesters", (req, res) => {
  res.status(201).json({
    branches: branches,
    semesters: semesters,
  });
});

app.post("/getAllSubjects", (req, res) => {
  const { branch, semester } = req.body;
  const ans = subjects[branch][semester];
  if (ans) {
    res.status(201).json(ans);
  } else res.status(404).send(`backend error`);
});

app.post("/getSyllabusPdf", async (req, res) => {
  const { semester, branch, subject } = req.body;

  try {
    const url = `${semester}/${branch}/${subject}/SYLLABUS.pdf`;
    const { data } = supabase.storage
      .from("semesterQuestionBanks")
      .getPublicUrl(url);
    console.log("data", data);
    res.status(201).json({
      url: data.publicUrl,
    });
  } catch (error) {
    res.status(500).send("internal server eroor");
  }
});

app.post("/getSubjectPdf", async (req, res) => {
  const { semester, branch, subject } = req.body;

  try {
    const url = `pyq/${semester}/${branch}/${subject}.pdf`;
    const { data } = supabase.storage
      .from("semesterQuestionBanks")
      .getPublicUrl(url);
    console.log("data", data);
    res.status(201).json({
      url: data.publicUrl,
    });
  } catch (error) {
    res.status(500).send("internal server eroor");
  }
});

//listening
app.listen(8000, () => {
  console.log(`server running at port 8000`);
});
