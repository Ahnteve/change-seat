import express from "express";
import path from "path";
import formidable from "formidable";

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendfile("src/index.html");
});

app.post("/seat", async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    console.log(files);
  });
});

app.listen(3000, () => {
  console.log("server on");
});
