//import express
const express = require("express");

//express app

const app = express();

//register view engines
app.set("view engine", "ejs");

//listen for requests

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "abresh finds balls",
      snippet: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
    {
      title: "sol finds stars",
      snippet: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
    {
      title: "abrelo finds dimonds",
      snippet: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// EJS (Embedded JavaScript Templates) is a template engine used with Express to create dynamic HTML pages.

// Install: npm install ejs
// Enable EJS: app.set("view engine", "ejs")
// EJS files are usually stored in the views folder.
// EJS files use the .ejs extension.
// Use res.render("index") to render views/index.ejs.
// You can pass data from Express to EJS:
// res.render("index", { name: "John" })
// Display data using: <%= name %>
// Run JavaScript using: <% code %>
// EJS supports conditions and loops.
