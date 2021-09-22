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
    class: {
        type: "Number",
        min: 8,
        max: 9
    }
})

var Teacher = mongoose.model("Teacher", TeacherSchema)

module.exports = Teacher;