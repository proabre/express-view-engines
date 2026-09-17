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
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/404", (req, res) => {
  res.status(404).render("404");
});
