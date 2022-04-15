
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Duis felis nunc, scelerisque at nibh nec, feugiat faucibus sapien. Pellentesque luctus mi id mattis tempor. Morbi gravida tellus lacus, quis bibendum nisl iaculis sed. Sed sit amet luctus massa. Curabitur facilisis accumsan sapien, at tristique justo suscipit et. Sed dui nisi, volutpat eget fringilla eu, finibus non risus. Donec imperdiet tempus mi, feugiat sagittis lorem posuere at.";
const aboutContent = "Aenean pellentesque libero id vestibulum euismod. Quisque ac risus a quam rutrum aliquet. Curabitur mattis, velit pretium maximus semper, lacus arcu euismod urna, ornare maximus tortor orci at nunc. Proin bibendum enim eros, ac blandit lectus condimentum et. Vestibulum non arcu auctor, hendrerit nisl convallis, facilisis risus.out";
const contactContent = "Curabitur elementum egestas nunc laoreet dapibus. Morbi porta lacinia tempus. Fusce vel enim eu erat pellentesque aliquet gravida et neque. Quisque vitae ex nibh. Aenean vulputate, libero vel lobortis ultrices, turpis nunc fringilla justo, et semper magna mauris nec sapien.";

const posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("home", {starter: homeStartingContent, newPosts: posts});
});


app.get("/about", (req, res) => {
    res.render("about", {about: aboutContent});
});


app.get("/contact", (req, res) => {
    res.render("contact", {contact: contactContent});
});


app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.postTitle,
        content: req.body.postContent
    };
    posts.push(post);
    res.redirect("/");
});


app.get("/posts/:postName", (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postName);
    posts.forEach(post => {
        if (_.lowerCase(post.title) === requestedTitle) {
            res.render("post", {post: post});
        }
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000.");
});