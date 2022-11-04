const express = require("express");
const ejs = require("ejs");

const app= express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("home");
});

app.get("/charity",function(req,res){
  res.render("charity");
});

app.get("/volunteer",function(req,res){
  res.render("volunteer");
});

app.get("/fund",function(req,res){
  res.render("fund");
});

app.get("/shop",function(req,res){
  res.render("shop");
});


app.get("/charityPost",function(req,res){
  res.render("charityPost");
});


app.listen(process.env.PORT||3000, function() {
  console.log("Server has started successfully!");
});
