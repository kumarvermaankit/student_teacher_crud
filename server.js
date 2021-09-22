const express = require('express')
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

const teacher = require("./controllers/teacher_operations")

require('dotenv').config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
try {
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
    })
}
catch (err) {
    console.log(err);
}

app.use("/teacher", teacher)


app.listen(port, () => {
    console.log("Server is running");

})