const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

//we use the express router to split our routes into a diffrent files and manage them in small groups of routes to make our app much more easier to manage its routes as the projects bigger and bigger

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) //sort blogs in decending order i.e from newest to oldest
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//post method to create a blog and put into a database
router.post("/", (req, res) => {
  //console.log(req.body);

  const blog = new Blog(req.body);

  blog
    .save() //save into the database after clicking submit button on the form
    .then((result) => {
      res.redirect("/blogs"); //redirecting to blogs to display newly submited blogs after saving to db
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

//retrive and dispaly specefic blog by its unique id
router.get("/:id", (req, res) => {
  const id = req.params.id; //Used to get values from the URL. If you visit:/blogs/123  then req.param.id is 123
  //console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog details" });
    })
    .catch((err) => {
      console.log(err);
      router;
    });
});

//delete request to delete a blog by its unique id
router.delete("/:id", (req, res) => {
  const id = req.params.id; //to get id from url

  Blog.findByIdAndDelete(id) //delete a blog at this specific id
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
