//data
const years = ["2023", "2024", "2025"];
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

module.exports = { years, semesters, branches, subjects };
