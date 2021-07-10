const express = require("express");
const fs = require("fs");
const port = 3000;
const app = express();
app.use(express.json());
// YOUR CODE GOES IN HERE

app.get("/", function (req, res) {
  res.send("Hello World");
});

// posting a new blog ===================
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
    fs.writeFile(`./blogs/${data.title.toLowerCase()}`, data.content, (err) => {
      if (err) throw err;
      console.log("The blog has been saved!");
      res.status(200).send("ok");
    });
  });
}

// Updating existing posts ===================

app.put("/blogs/:title", (req, res) => updateBlog(req, res));

function updateBlog(req, res) {
  if (isInValid(req)) {
    res.status(400).send("Invalid Request");
    return;
  }
  const data = req.body;
  if (fs.existsSync(`./blogs/${req.params.title.toLowerCase()}`)) {
    fs.writeFile(
      `./blogs/${req.params.title.toLowerCase()}`,
      data.content,
      (err) => {
        if (err) throw err;
        console.log("The blog has been updated!");
        res.status(200).send("ok");
      }
    );
  } else {
    res.status(400).send("Blog not found");
  }
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
