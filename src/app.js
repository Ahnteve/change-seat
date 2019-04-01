import express from "express";
import path from "path";

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendfile("index.html");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server on");
});
