const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

app.get("/", (req, res) => {
  res.status(200).render("index.pug");
});

// --------------------------------------------------------------------------------------------------

// To Do when form is submitted.
app.post("/", (req, res) => {
  let output = req.body;
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let query = req.body.query;

  let fileContent = ` \
  name: ${name}, \
  email: ${email},\
  phone: ${phone},\
  query: ${query},\
  `;

  fs.writeFileSync("output.txt", fileContent);

  console.log(output);
  const params = {message: "Your form has been submitted successfully"};
  res.status(200).render("fill.pug");
});


// ------------------------------------------------------------------

// Listening on PORT 80
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
