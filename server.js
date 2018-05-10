const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT ||3000
var app=new express();
// app.use((req,res,next)=>{
//     res.render('maintenence.hbs')
// })
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method}: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',`${log}`+'\n',(err)=> {
        if (err) {
            console.log('unable to append server.log');
        }
    })
    next();
})

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.set('view engine','hbs');
app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:'Project page'
    });

})
app.get('/',(req,res)=>{
res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to our website',
});
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About us',
    });
})
app.listen(port,()=>{
    console.log(`it is running on port${port}`);
});