const express = require("express");
const fs = require("fs");
const port = 3000;
const app = express();
app.use(express.json());
// YOUR CODE GOES IN HERE

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/blogs", (req, res) => createBlog(req, res));

function createBlog(req, res) {
  if (isInValid(req)) {
    res.status(400).send("Invalid Request");
    return;
  }
  const data = req.body;
  // check if blog title already exist
  fs.readdir("./blogs", (err, files) => {
    const found = files.some(
      (file) => file.toLowerCase() === data.title.toLowerCase()
    );
    if (found) {
      res.send("This blog is already existed");
      return;
    }
    fs.writeFile(`./blogs/${data.title}`, data.content, (err) => {
      if (err) throw err;
      console.log("The blog has been saved!");
      res.status(200).send("ok");
    });
  });
}

function isInValid(req) {
  if (
    typeof req.body == "undefined" ||
    typeof req.body.title == "undefined" ||
    typeof req.body.content == "undefined"
  ) {
    return true;
  } else {
    return false;
  }
}
app.listen(port, () => {
  console.log(`Server started at port ${port} ...`);
});
