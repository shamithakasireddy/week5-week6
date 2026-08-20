const express = require("express");

const app = express();
const PORT = 3000;

// 1. Basic route
app.get("/", (req, res) => {
    res.send("Welcome to Express.js Web Server!");
});

// 2. Another basic route
app.get("/about", (req, res) => {
    res.send("This is the About page.");
});

// 3. Route parameter
// Example: /user/Harshitha
app.get("/user/:name", (req, res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!`);
});

// Multiple route parameters
// Example: /student/101/Harshitha
app.get("/student/:id/:name", (req, res) => {
    const id = req.params.id;
    const name = req.params.name;

    res.send(`Student ID: ${id}<br>Student Name: ${name}`);
});

// 4. Query parameters
// Example: /search?name=Harshitha&course=Express
app.get("/search", (req, res) => {
    const name = req.query.name;
    const course = req.query.course;

    res.send(`Name: ${name}<br>Course: ${course}`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});