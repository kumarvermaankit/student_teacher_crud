var mongoose = require("mongoose");

var TeacherSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true
    },
    subject: {
        type: "String",

    }
})

var Teacher = mongoose.model("Teacher", TeacherSchema)

module.exports = Teacher;