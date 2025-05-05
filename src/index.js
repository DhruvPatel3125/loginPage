const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb")

const templatePath = path.join(__dirname, "../template");
const publicPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.static(publicPath)); 
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup",async(req,res)=>{
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    await collection.insertMany([data])
    res.render("home")
})
app.post("/login",async(req,res)=>{
   try{
    const check = await collection.findOne({name:req.body.name})
    if(check.password === req.body.password){
        res.render("home")
    }
    else{
        res.send("Wrong Password")
    }
   }catch{
    res.send("Wrong details")
   }

})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// create server in nodejs