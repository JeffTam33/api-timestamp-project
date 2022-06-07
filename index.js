// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res, next) {
  res.json({greeting: 'hello API'});
  next();
});

app.get("/api/:date?", function(req, res, next) {
  var arg = req.params.date;
  var date = new Date(arg);
  var unix = date.getTime();
  var utc = date.toUTCString();

  console.log(moment("06/22/2015", "MM/DD/YYYY", true).isValid())

  if (arg === undefined){
    date = new Date();
    unix = date.getTime();
    utc = date.toUTCString();
    res.json({
    "unix": unix,
    "utc": utc
    })
    return
  }

  if(new Date(arg).toString() === "Invalid Date"){
    if(arg.match(/^[0-9]/)){
      unix = parseInt(arg);
      date = new Date(unix);
      utc = date.toUTCString();
    }else{
      res.json(
        { error : "Invalid Date" }
      )
      return;
    }
  }else{
    unix = new Date(arg).getTime(); 
    date = new Date(arg);
    utc = date.toUTCString();
  }
  res.json({
    "unix": unix,
    "utc": utc
  })
  next();
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
