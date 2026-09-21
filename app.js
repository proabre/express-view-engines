//import express
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
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
app.use(express.urlencoded({ extended: true })); //express.urlencoded() is middleware that lets Express read data sent from HTML forms.

//blog routes

app.use("/blogs", blogRoutes);

//mongoose and mongo sandbox routes

app.get("/add-blog", (req, res) => {
  //blog model
  const blog = new Blog({
    title: "new blog 4",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog //get data and save in database
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

//middle ware without next()
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
