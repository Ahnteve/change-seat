import express from "express";
import path from "path";
import fs from "fs";
import moment from "moment";

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendfile("src/index.html");
});

app.post("/file", async (req, res) => {
  const classroomInfo = JSON.stringify(req.body);
  const now = moment().format("YYYYMMDD");
  const filePath = path.join(__dirname, "tmp", `${now}.seat`);

  fs.writeFileSync(filePath, classroomInfo, "utf8");
  res.download(filePath);
});

app.listen(3000, () => {
  console.log("server on");
});
