
const express = require('express')
const PORT = 3000
const app = express();
const path = require('path')
const query = require('./db')
app.use(express.static('public'));
const bodyparser = require("body-parser");
const { executionAsyncResource } = require('async_hooks');
const { Console } = require('console');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
const session = require("express-session");
const cookieparser = require("cookie-parser");
const { nextTick } = require('process');
app.use(cookieparser())

app.use(session({resave: true, saveUninitialized: true, secret: 'XCR3rsasa%RDHHH', cookie: { maxAge: 60000 }}));

const isAuth = (req, res, next) => {
    if(!req.session.email) res.redirect("signUp.html");
    else next()
}
app.get("/",(req,res)=>{;
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.get("/payment",isAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/payment.html"))
})

app.get("/indexcart",isAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/indexcart.html"))
})

app.get("/getproduct", async (req,res)=>{
    const productnumber = req.query.number
    console.log(productnumber)
    const results = await query('SELECT * FROM `products` WHERE `id` = ?',[productnumber]);
    console.log(results[0])
    res.send(results[0])

})


app.get("/rating",isAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/rating.html"))
})



app.post("/login", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const remember = req.body.remember;
    const results = await query('SELECT * FROM `registration` WHERE `email`=?',  [email]);
    if(results.length == 0) return res.send("User not found");
    if(results[0].password != password) return res.send("Incorrect password");
    req.session.username = results[0].username;
    req.session.email = results[0].email;
    res.redirect("/");
})
app.listen(PORT ,(req,res) => {
    console.log("SERVER RUNNING")
});



app.post("/signup", async(req, res) => {
    let err = false;


    try{
        await query(`INSERT INTO registration(\`full name\`, \`username\`, \`email\`, \`phone number\`, \`password\`, \`gender\`) VALUES ('${req.body.name}', '${req.body.username}','${req.body.email}','${req.body.number}','${req.body.password}','${req.body.gender}')`)
    }
    catch(e) {
        console.log("HERE")
        err = true;
    
    res.send("User exists");
    }
    
    if(!err) res.redirect("/")
   
        
       });

       

       app.post("/payment", async(req, res) => {
        console.log(req.body);
        console.log(req.body.amount);
      query(`INSERT INTO payment(\`full name\`, \`email\`,\`address\`,\`city\`,\`state\`,\`zipcode\`, \`upi id\`,\`upi password\`,\`price\`) VALUES ('${req.body.fname}', '${req.body.email}','${req.body.address}','${req.body.city}','${req.body.state}','${req.body.zipcode}','${req.body.upi}','${req.body.pass}','${req.body.amount}')`)
            res.send("Payment Succesfull!");
        
     query(`INSERT INTO \`orders\`(\`price\`, \`Product_name\`, \`email\`) VALUES (?)`, [[req.body.amount, req.body.name,req.body.email]]);
     
           });


           app.post("/ratings", async(req, res) => {
         const result = await query(`INSERT INTO \`ratings\`(\`username\`, \`email\`, \`review\`) VALUES ('${req.session.username}','${req.session.email}','${req.body.review}')`)
            console.log(result);
                res.redirect("/")
               });
