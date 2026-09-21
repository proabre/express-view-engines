//import express
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//express app
const app = express();

//connect to mongodb
const dbURI = `mongodb+srv://abresh:test1234@cluster0.yqmtu5c.mongodb.net/node-tuts?appName=Cluster0`;
mongoose
  .connect(dbURI)
  .then((result) =>
    //listen for requests after connecting to db
    app.listen(3000, () => {
      console.log(`Server is running on http://localhost:3000`);
    }),
  )
  .catch((err) => console.log(err));

//register view engines
app.set("view engine", "ejs");

//routes

app.get("/", (req, res) => {
  /*
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

  */

  res.redirect("/blogs"); //resirecting home page to blogs
});

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded()); //takes all url encoded data and it passes it intoan object that we can use in the request object

//blog routes

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) //sort blogs in decending order i.e from newest to oldest
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.post("/blogs", (req, res) => {
  //console.log(req.body);

  const blog = new Blog(req.body);

  blog
    .save() //save into the data base after clicking submit button on the form
    .then((result) => {
      res.redirect("/blogs"); //redirecting to blogs to display newly submited blogs after saving to db
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

//mongoose and mongo sandbox routes

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 4",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog //get data and save in database6
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find() //get all data data from follection using the Blog model and a method find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("6ab025765365f3ab1e667199") //get a single blog from database collections with id
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//middle ware with out next()
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

//to install mongoose npm install mongoose
