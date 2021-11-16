const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function(){
  console.log("server is up and running")
});

app.get("/", function(req, res){
  res.sendfile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var emailAddress = req.body.emailAddress;

var user = {
  members:[
    {
    "email_address": emailAddress,
    "status": "subscribed",
    "merge_fields": {
  	"FNAME": firstName,
  	"LNAME": lastName,
       }
}]};

var json = JSON.stringify(user);

const url = "https://us20.api.mailchimp.com/3.0/lists/688464628f";

const options ={
  method: "POST",
  auth: "ahmedmaher:52a6aec95d2a34bf0ba2f3c228181381-us20"
};



const request = https.request(url, options, function(response){
  response.on("data", function(data){
  })
  if(response.statusCode == 200){
    res.sendfile(__dirname + "/success.html");
  }else{
    res.sendfile(__dirname + "/failure.html");
  }
console.log(response);
});

request.write(json);
request.end();

});




// .
//
