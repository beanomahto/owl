const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const supabase = require("./utility/supabase.js");
//integration
const allowedOrigins = [
  "http://localhost:5173",
  "https://pathshala-blond.vercel.app",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  maxAge: 600,
};
app.use(cors(corsOptions));
app.use(express.json());

//data
const years = ["2024", "2025"];
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
//routes
app.get("/api", (req, res) => {
  res.send(`hello world`);
});

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
