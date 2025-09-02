const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const supabase=require("./utility/supabase.js")

//homePage
app.get("/", (req, res) => {
  res.send(`hello world`);
});

//getting a single pdf
app.post("/getPaper", async (req, res) => {
  const { branch, paper } = req.body;

  try {
    const url = `${branch}/${paper}.pdf`;
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

const branches = [
  "CSE",
  "ECE",
  "IT",
  "EE",
  "ME",
  "CE",
  "CHE",
  "PRO",
  "METAL",
  "MIN",
];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const data = {
  CSE: {
    1: ["Maths", "Physics"],
    2: ["DSA", "OOPS"],
  },
  ECE: {
    1: ["Circuits", "Signals"],
    2: ["CN", "Digital Logic"],
  },
};
//getting all branches and sem list
app.get("/getBranchesAndSemesters", (req, res) => {
  res.status(201).json({
    branches: branches,
    semesters: semesters,
  });
});
//getting all subjects list of a particular sem and branch
app.post("/getAllSubjects", (req, res) => {
  const { branch, semester } = req.body;
  const ans = data[branch][semester];
  if (ans) {
    res.status(201).json(ans);
  } else res.status(404).send(`backend error`);
});

//listening
app.listen(8000, () => {
  console.log(`server running at port 8000`);
});
