const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", (req, res) => {
  const body = req.body;
  const firstName = body.firstName;
  const lastName = body.lastName;
  const data = {
    members: [
      {
        email_address: body.email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/9a66ed5182";
  const options = {
    method: "POST",
    auth: "Ajmal777:aa8c3a2dda93ba310279e1b9e4d3e9e6-us14"
  }
  //04d2c007-e0ee-494d-8081-f930f461ff99
  const request = https.request(url, options, (response) => {
    const status = response.statusCode;
    if (status === 200) {
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", (data) => {
      // console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
})

app.post("/failure", (req, res) => {
  res.redirect("/");
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
