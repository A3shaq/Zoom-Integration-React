import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import "./App.css";
import axios from "axios";
const API_KEY = "";

function ZoomMeeting(props) {
  ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.7/lib", "/av");
  const preLoad = ZoomMtg.preLoadWasm();
  const prepareSDK = ZoomMtg.prepareJssdk();

  console.log(preLoad, prepareSDK, "preLoad,prepareSDK");
  console.log(props, "...props");

  const obj = {
    signatureEndpoint: "http://localhost:4000",
    apiKey: API_KEY,
    meetingNumber: Math.random() * 6000,
    role: 1,
    leaveUrl: "http://localhost:3000/",
    userName: "Muhammad Arshaq",
    userEmail: "developers@appverticals.com",
    passWord: "",
  };

  useEffect(() => {
    const zmmtgElement = (document.getElementById(
      "zmmtg-root"
    ).style.visibility = "initial");
    axios
      .post("http://localhost:4000/api/start_meeting", {
        meetingNumber: props?.meetingId?.id,
        role: 1,
      })

      // .then(function (res) {
      //    res.json();
      // })
      .then(function (res) {
        console.log(res,"res....")
        ZoomMtg.init({
          leaveUrl: obj.leaveUrl,
          isSupportAV: true,
          success() {
            ZoomMtg.join({
              meetingNumber: props?.meetingId?.id,
              userName: obj.userName,
              userEmail: obj.userEmail,
              signature: res?.data?.signature,
              apiKey: obj.apiKey,
              passWord:  props?.meetingId?.password,
              success() {
                console.log("success")
                ZoomMtg.showRecordFunction({
                  show: true,
                });
              },
              error() {},
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

  console.log("process.env..",process.env)
  return (
    <div className="ZoomMeeting">
      <button>Join In</button>
    </div>
  );
}

export default ZoomMeeting;
