const { ObjectId } = require("bson")
var mongoose = require("mongoose")

var StudentSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true
    },
    class: {
        type: "Number",
        min: 8,
        max: 9,
        required: true
    },
    section: {
        type: "String",
        required: true
    },
    assingnedTeacher: {
        type: "String",
    }
})

var Student = mongoose.model("Student", StudentSchema)

module.exports = Student;