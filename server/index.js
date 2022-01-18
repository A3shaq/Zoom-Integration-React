require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
const { KJUR } = require("jsrsasign");
const rp = require("request-promise");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json(), cors());
app.options("*", cors());


const API_KEY = "";
const API_SECRET_KEY = "";

app.post("/api/start_meeting", (req, res) => {
  console.log(req.body, "port 4000");
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(
    API_KEY + req.body.meetingNumber + timestamp + req.body.role
  ).toString("base64");
  const hash = crypto
    .createHmac("sha256", API_SECRET_KEY)
    .update(msg)
    .digest("base64");
  const signature = Buffer.from(
    `${API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`
  ).toString("base64");

  res.json({
    signature: signature,
  });
});
const oHeader = { alg: "HS256", typ: "JWT" };
const payload = {
  iss: API_KEY,
  exp: new Date().getTime() + 50000,
};

const sHeader = JSON.stringify(oHeader);
const sPayload = JSON.stringify(payload);
const token = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, API_SECRET_KEY);

// app.post("/api/create_meeting", (req, res) => {
//   const options = {
//     method: "POST",
//     url: "http://api.zoom.us/v2/users/" + req.body.email + "/meetings",
//     body: {
//       topic: "Meeting",
//       type: 0,
//       settings: {
//         host_video: true,
//         participant_video: true,
//       },
//     },
//     auth: {
//       bearer: token,
//     },
//     headers :{
//       "user-agent":"zoom-api-jwt-Request",
//       "content-type":"application/json"
//     },
//     json:true
//   };
//   rp(options)
//     .then(function(response) {
//       console.log("response is: ", response);
//       res.send("create meeting result: " + JSON.stringify(response));
//     })
//     .catch(function(err) {
//       // API call failed...
//       console.log("API call failed, reason ", err);
//     });
// });

app.post("/api/newmeeting", (req, res) => {
  console.log("new_meeting");
  email = req.body.email;
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    qs: {
      status: "active", // -> uri + '?status=active'
    },
    body: {
      topic: "test create meeting",
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is:", response);
      res.json(response);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

// Create meeting api

app.post("/api/create_meeting", (req, res) => {
  console.log(" Create meeting api", req.body);
  const { userId: user_id } = req.body;
  console.log("user_id", user_id, res.client);
  if (user_id) {
    var options = {
      method: "POST",
      uri: "https://api.zoom.us/v2/users/" + user_id + "/meetings",
      qs: {
        status: "active", // -> uri + '?status=active'
      },
      body: {
        topic: "test create meeting",
        type: 1,
        settings: {
          host_video: false,
          participant_video: true,
          // meeting_authentication :true,
          join_before_host: false,
          waiting_room:false,
          approval_type:2
        },
      },
      auth: {
        bearer: token,
      },
      headers: {
        "User-Agent": "Zoom-Jwt-Request",
        "content-type": "application/json",
      },
      json: true, //Parse the JSON string in the response
    };

    rp(options)
      .then(function (response) {
        console.log("create meeting res...", response);
        res.json(response);
      })
      .catch(function (err) {
        // API call failed...
        console.log("API call failed, reason ", err);
      });
  }
});

app.listen(port, () =>
  console.log(`Zoom Web Client SDK Sample Signature Node.js on port ${port}!`)
);
