const express = require('express');
const app = express();
const Path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.set("views", Path.join(__dirname, "views"));
app.use(express.static(Path.join(__dirname, "public")));

let posts = [
    { id: uuidv4(), username: "Amit", content: " love for coding" },
    { id: uuidv4(), username: "Ravi", content: " love for music" },
    { id: uuidv4(), username: "Ankit", content: " love for sports" }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let Id = uuidv4();
    posts.push({ Id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => p.id === id);
    if (!post) {
        res.status(404).send("Post not found");
    } else {
        res.render("show.ejs", { post });
    }
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("listening to the port no 8000");
})
