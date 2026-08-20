const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON request body
app.use(express.json());

// Custom logging middleware
app.use((req, res, next) => {
    const time = new Date().toLocaleString();

    console.log(`[${time}] ${req.method} ${req.url}`);

    next();
});

// Sample data
let students = [
    { id: 1, name: "Harshitha", course: "CSE" },
    { id: 2, name: "Rahul", course: "ECE" }
];

// GET - Get all students
app.get("/students", (req, res) => {
    res.status(200).json(students);
});

// GET - Get a student by ID
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST - Add a new student
app.post("/students", (req, res) => {
    const { name, course } = req.body;

    const newStudent = {
        id: students.length + 1,
        name: name,
        course: course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update a student
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.course = req.body.course;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE - Delete a student
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});