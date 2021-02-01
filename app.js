
  //jshint esversion: 6







  const express = require('express');
  const bodyParser = require('body-parser');
  const request = require('request');
  const https = require('https');

  const app = express();
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(express.static('public'));

  app.get("/", function (req, res) {
    res.sendFile( __dirname + "/signup.html");
  })

  app.post("/", function (req, res) {
    const fname = req.body.fName;
    const lname = req.body.lName;
    const email = req.body.email;

    const data = {
      members: [
        {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/c540e442d7";

  const options = {
    method: "POST",
    auth: "imran:0007b924d7e61a7d152af7d4c90a2b30-us10",
  }

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));

      if(response.statusCode != 200){
        res.sendFile( __dirname + '/failure.html');
      }else{
        res.sendFile( __dirname + '/success.html');
      }
    })
  });

  request.write(jsonData);
  request.end();

  });



  app.post('/failure', function (req, res) {
    res.redirect("/");
  })



  app.listen(process.env.PORT || 3000, function () {
    console.log('server is running at port 3000.');
  })

  //appkey
  //0007b924d7e61a7d152af7d4c90a2b30-us10

  //audience id OR listid
  //c540e442d7
