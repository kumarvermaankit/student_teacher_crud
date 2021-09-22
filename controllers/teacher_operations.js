const express = require("express")

const Router = express.Router()

const Teacher = require("../models/teacher")

function CreateTeacher(name, email, classroom) {
    const newTeacher = {
        name: name,
        email: email,
        classroom: classroom,
    }
    Teacher.find({ email: email }).then((res) => {
        if (!res) {
            Teacher.create(newTeacher)
            console.log("User added Successfully")
        }
        else {
            console.log("User Already Exists")
        }
    })



}

CreateTeacher("Rabindranath", "rabindranath@gmail.com", 8)
CreateTeacher("Robert Frost", "robertfrost@gmail.com", 9)
CreateTeacher("Hajime Isayama", "isayama@gmail.com", 8)
CreateTeacher("Peter Thiel", "thiel@gmail.com", 9)
CreateTeacher("Chester Bennington", "chester@gmail.com", 9)



Router.get("/", (req, res, next) => {
    try {
        Teacher.find()
            .then((result) => {
                res.status(200).json(result)
            })
    }
    catch (err) {
        res.status(500).json("Error Found")
    }
})

Router.get("/subject/:subjectname", (req, res, next) => {
    try {
        Teacher.find({ subject: req.params.subjectname })
            .then((result) => {
                res.status(200).json(result)
            })
    }
    catch (err) {
        res.status(500).json("Error Found")
    }
})



module.exports = Router