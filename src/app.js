import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendfile("src/index.html");
});

app.listen(3000, () => {
  console.log("server on");
});
