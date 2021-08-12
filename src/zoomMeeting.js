import React, { useEffect, useState } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import "./App.css";

function ZoomMeeting() {
  const [isCreated, setIsCreated] = useState(false);
  ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.7/lib", "/av");
  const preLoad = ZoomMtg.preLoadWasm();
  const prepareSDK = ZoomMtg.prepareJssdk();

  console.log(preLoad, prepareSDK, "preLoad,prepareSDK");

  const obj = {
    signatureEndpoint: "http://localhost:4000",
    apiKey: "07jf6fTPR4aICa15-kt4HA",
    meetingNumber: Math.random() * 6000,
    role: 0,
    leaveUrl: "http://localhost:3000/",
    userName: "Muhammad Arshaq",
    userEmail: "muhammad.arshaq@koderlabs.com",
    passWord: "asd123$$A",
  };

  useEffect(() => {
    const zmmtgElement = (document.getElementById(
      "zmmtg-root"
    ).style.visibility = "initial");
    fetch("http://localhost:4000/api/start_meeting", {
      method: "POST",
      body: JSON.stringify({ meetingNumber: 123456789656565665, role: 0 }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        ZoomMtg.init({
          leaveUrl: obj.leaveUrl,
          isSupportAV: true,
          success: (success) => {
            console.log(success);

            ZoomMtg.join({
              signature: res.signature,
              meetingNumber: "123456789",
              userName: obj.userName,
              apiKey: obj.apiKey,
              userEmail: obj.userEmail,
              passWord: obj.passWord,
              success: (success) => {
                ZoomMtg.showRecordFunction({
                  show: true,
                });
                console.log(success);
              },
              error: (error) => {
                console.log(error);
              },
            });
          },
          error: (error) => {
            console.log(error);
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="ZoomMeeting">
      <button>Join In</button>
    </div>
  );
}

export default ZoomMeeting;
