const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const request = require("request");
//unique api key
let apikey = "da9e532566ae485e416828ef3d7569f3";


//for static file
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

//for template engine
app.set("view engine","ejs");

app.get("/",(req,res) => {
    //res.send("Hello World");
    res.render("index",{weather:null,error:null});
})
/*
app.post("/",(req,res) => {
   
    console.log(req.body.city);
    //res.render("index");
    res.send("requested sent successfully");
})
*/
app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
  
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!
                             wind ${weather.wind.speed} m/s and cloud ${weather.clouds.all}% and humidity is ${weather.main.humidity}`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })
app.listen(3000,() => {
    console.log("Server is running at port 3000");
})