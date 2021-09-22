const express = require("express");


const Router = express.Router()

const Student = require("../models/student")
const Teacher = require("../models/teacher");



async function CreateStudent(name, email, classroom, section, assingnedTeachername) {

    var id;
    var res = await Teacher.findOne({ name: assingnedTeachername })

    if (res) {
        var id = res._id.toString()



        const newStudent = {
            name: name,
            email: email,
            class: classroom,
            section: section,
            assingnedTeacher: id
        }

        Student.findOne({ email: email }).then((res) => {
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

Router.get("/class/:class", (req, res, next) => {
    try {
        Student.find({ class: req.params.class })
            .then((result) => {
                res.status(200).json(result)
            })
    }
    catch (err) {
        res.status(500).json("Error Found")
    }
})

Router.get("/section/:section", (req, res, next) => {
    try {
        Student.find({ section: req.params.section })
            .then((result) => {
                res.status(200).json(result)
            })
    }
    catch (err) {
        res.status(500).json("Error Found")
    }
})

Router.post("/class/:name/:class", (req, res, next) => {

    console.log(req.params)

    try {
        Student.updateOne({ name: req.params.name }, { $set: { class: req.params.class } })
        res.status(200).json("Updated")
    }
    catch (err) {
        res.status(500).json(err)
    }
})

Router.post("/section/:name/section", (req, res, next) => {
    try {
        Student.updateOne({ name: req.params.name }, { $set: { section: req.params.section } })
        res.status(200).json("Updated")
    }
    catch (err) {
        res.json(200).json("Already Exists")
    }
})


Router.post("/email/:name/email", (req, res, next) => {
    try {
        Student.updateOne({ name: req.params.name }, { $set: { email: req.params.email } })
        res.status(200).json("Updated")
    }
    catch (err) {
        res.json(200).json("Already Exists")
    }
})

Router.get("/teacher/:teacher_id", (req, res, next) => {

    try {
        Student.find({ assingnedTeacher: req.params.teacher_id })
            .then((result) => {

                res.status(200).json(result)
            })
    }
    catch (err) {
        res.status(500).json(err)
    }
})
module.exports = Router