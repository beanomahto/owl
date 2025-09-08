const express = require("express");
const router = express.Router();
const {
  Home,
  AllBranchesSemesters,
  getYear,
  getBranch,
  getPdf,
} = require("../controllers/allcontroller.js");
const chat =require("../controllers/geminiController.js")

router.get("/", Home);
router.get("/getBranchesAndSemesters", AllBranchesSemesters);
router.get("/getYear", getYear);
router.get("/getAllSubjects/:semester/:branch", getBranch);
router.get("/getPdf", getPdf);
router.post("/chat",chat);

module.exports = router;
