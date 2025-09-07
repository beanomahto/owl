const express = require("express");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const supabase = require("./utility/supabase.js");

// const corsOptions = {
//   origin: ["http://localhost:5173", "https://pathshala-63yy.onrender.com"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

const corsOptions = {
  origin: ["http://localhost:5173", "https://pathshala-63yy.onrender.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  maxAge: 600, // cache preflight for 10 minutes
};

// apply CORS only once
app.use(cors(corsOptions));

// respond fast to OPTIONS requests


app.use(express.json());

app.get("/api", (req, res) => {
  res.send(`hello world`);
});
const years = ["2025", "2026"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const branches = ["CSE", "ECE"];
const subjects = {
  CSE: {
    6: ["MATHS", "PHYSICS"],
    7: ["DSA", "OOPS"],
  },
  ECE: {
    6: ["BSP", "COMPUTER_NETWORK", "VLSI", "IOT", "MICROWAVE_ELECTRONICS"],
    7: ["CN", "DIGITAL"],
  },
};

app.get("/getBranchesAndSemesters", (req, res) => {
  res.status(201).json({
    branches: branches,
    semesters: semesters,
  });
});

app.get("/getYear", (req, res) => {
  res.status(201).json(years);
});

app.get("/getAllSubjects/:semester/:branch", (req, res) => {
  const { branch, semester } = req.params;
  const ans = subjects[branch][semester];
  if (ans) {
    res.status(201).json(ans);
  } else res.status(404).send(`backend error`);
});

app.post("/getSyllabusPdf", async (req, res) => {
  const { semester, branch, subject, type, year } = req.body;

  try {
    let url = "";
    if (type == "syllabus")
      url = `${semester}/${branch}/${subject}/syllabus.pdf`;
    else url = `${semester}/${branch}/${subject}/${year}/${type}.pdf`;
    const { data } = supabase.storage
      .from("semesterQuestionBanks")
      .getPublicUrl(url);
    //console.log("data", data);
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
