const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`hello world`);
});

app.listen(8000, () => {
  console.log(`server running at port 8000`);
});
