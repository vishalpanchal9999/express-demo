/**
 * Created by vishal panchal on 7/11/2017.
 */

const express=require('express');

const hbs=require('hbs');
const fs=require('fs');

var app=new express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname+"/public"));

hbs.registerPartials(__dirname+"/views/partials");

hbs.registerHelper('getCurrentyear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    var log=new Date().toString() + req.method +  req.url;
    // console.log( )
    fs.appendFile("server.log", log +'\n')
next();
})

//------------ Maintainance Middleware ----------------------//
// app.use((req,res,next)=>{
//     res.render("maintainance.hbs");
// })

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        // year:new Date().getFullYear(),
        welcomeMessage:'Welcome to my website'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        // year:new Date().getFullYear()
    })
});

app.get('/jsondemo',(req,res)=>{
    res.send({
       "name":"Vishal Panchal",
    });
});

app.listen(3000,()=>{
    console.log("Server is up");
});
