const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/LoginSignup").then(() => {
    console.log("Connection successful")
}
).catch((err) => {
    console.log(err)
})

const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

})

const collection = new mongoose.model("LogInCollection",loginSchema)
module.exports = collection
