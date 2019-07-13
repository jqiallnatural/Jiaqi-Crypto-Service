//jshint esversion: 6
//incorperated price conversion API passing into our website. we set our server to talk to bitcoin server to grab pieces of data that user has requested using their APIs and specified parameters


//import and incorperated express into our file
const express = require('express')

//in order to read HTTP POST data , we have to use "body-parser" node module. body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.bod
const bodyParser = require("body-parser")
const request = require("request")
//fuction that represents express module, //pass data from html form, grab info gets posted to your server from html form
const app = express()
app.use(bodyParser.urlencoded({extended: true}))

//__dirname: instead of relative file path, dirname provide file path of current file no matter where's hosted
// when user load the page, they receive index.html file
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

//get the data user chooses from server based on drop down menu
app.post("/", function(req, res){

    var amount = req.body.amount
    var crypto = req.body.crypto
    var fiat = req.body.fiat
    var backClickedDouble = req.body.clickedDouble

    if (backClickedDouble === "clicked"){
        amount = amount * 2
    }

    // if (crypto === "NEO") {
    //     res.write('sorry we will be tracking XRP in the near future :)')
    //     return res.send()
    // }
//creating an object to set up conversion feature
//the keys in the object are specified in the original API
    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount,
        }
    }
//http request for external server, when click button, it makes request
//request will take all of our options into input
    request(options, function(error, response, body){
    var data = JSON.parse(body)
    var price = data.price; //get current price
    var currentData = data.time
//for multiple messages, use res.write
    res.write(`<p>The current time is ${currentData}</p>`)
    res.write(`<h1>Amount${crypto} is currently worth ${price} ${fiat}</h1>`)
    //sending the data to the web page and display, it is the last command, for multiple messages, use res.write
    res.send();
})
})
//the app listen to the server port 3000
app.listen(3000,()=>console.log("Server is running"))