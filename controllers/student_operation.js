const express = require("express");
const { model } = require("mongoose");

const router = express.Router()

const Student = require("../models/student")
const Teacher = require("../models/teacher");
const Router = require("./teacher_operations");


async function CreateStudent(name, email, classroom, section, assingnedTeachername) {

    var id;
    var res = await Teacher.findOne({ name: assingnedTeachername })

    if (res) {
        var id = res._id



        const newStudent = {
            name: name,
            email: email,
            classroom: classroom,
            section: section,
            assingnedTeacher: id
        }

        Student.find({ email: email }).then((res) => {
            if (!res) {
                Student.create(newStudent)
                console.log("User Created")
            }
            else {
                console.log("User Already Exists")
            }
        })

    }
}

CreateStudent("Ankit", "ankit@gmail.com", 9, "D", "Robert Frost")
CreateStudent("Amol", "amol@gmail.com", 8, "A", "Rabindranath")
CreateStudent("Aashish", "aashish@gmail.com", 8, "C", "Hajime Isayama")
CreateStudent("Riya", "riya@gmail.com", 9, "B", "Chester Bennington")
CreateStudent("Pallavi", "pallavi@gmail.com", 9, "D", "Peter Thiel")

CreateStudent("Karan", "karan@gmail.com", 9, "D", "Robert Frost")
CreateStudent("Shubham", "shubham@gmail.com", 8, "A", "Rabindranath")
CreateStudent("Pranshu", "pranshu@gmail.com", 8, "C", "Hajime Isayama")
CreateStudent("Pranjal", "pranjal@gmail.com", 9, "B", "Chester Bennington")
CreateStudent("Himanshi", "himanshi@gmail.com", 9, "D", "Peter Thiel")


Router.get("/", (req, res, next) => {
    try {
        Student.find()
            .then((result) => {
                res.status(200).json(result)
            })
    }
    catch (err) {
        res.status(500).json("Error Found")
    }
})

Router.get("/subject/:class", (req, res, next) => {
    try {
        Teacher.find({ subject: req.params.class })
            .then((result) => {
                res.status(200).json(result)
            })
    }
    catch (err) {
        res.status(500).json("Error Found")
    }
})

Router.get("/subject/:section", (req, res, next) => {
    try {
        Teacher.find({ subject: req.params.section })
            .then((result) => {
                res.status(200).json(result)
            })
    }
    catch (err) {
        res.status(500).json("Error Found")
    }
})

Router.post("/class", (req, res, next) => {
    try {
        Teacher.updateOne({ name: req.body.name }, { $set: { class: req.body.class } })
        res.status(200).json("Updated")
    }
    catch (err) {
        res.json(200).json("Already Exists")
    }
})

Router.post("/section", (req, res, next) => {
    try {
        Teacher.updateOne({ name: req.body.name }, { $set: { section: req.body.section } })
        res.status(200).json("Updated")
    }
    catch (err) {
        res.json(200).json("Already Exists")
    }
})


Router.post("/email", (req, res, next) => {
    try {
        Teacher.updateOne({ name: req.body.name }, { $set: { email: req.body.email } })
        res.status(200).json("Updated")
    }
    catch (err) {
        res.json(200).json("Already Exists")
    }
})

Router.get("/teacher/:teacher_id", (req, res, next) => {
    try {
        Teacher.find({ assignedTeacher: req.params.teacher_id })
            .then((result) => {
                res.status(200).json(result)
            })
    }
    catch (err) {
        res.status(500).json("Error Found")
    }
})
module.exports = Router