const express = require("express")

const Router = express.Router()

const Teacher = require("../models/teacher")

function CreateTeacher(name, email, subject) {
    const newTeacher = {
        name: name,
        email: email,
        subject: subject,
    }
    Teacher.findOne({ email: email }).then((res) => {

        if (!res) {
            Teacher.create(newTeacher)
            console.log("User added Successfully")
        }
        else {
            console.log("User Already Exists")
        }
    })



}

CreateTeacher("Rabindranath", "rabindranath@gmail.com", "Hindi")
CreateTeacher("Robert Frost", "robertfrost@gmail.com", "English")
CreateTeacher("Hajime Isayama", "isayama@gmail.com", "Creativity")
CreateTeacher("Peter Thiel", "thiel@gmail.com", "Entrepreneurship")
CreateTeacher("Chester Bennington", "chester@gmail.com", "Singing")



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