import axios from "axios";
import React, { useEffect, useState } from "react";

import "./App.css";
import ZoomMeeting from "./zoomMeeting";

function App() {
  const [isCreated, setIsCreated] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [email] = useState("developers@appverticals.com");
  useEffect(() => {
    const zmmtgElement = (document.getElementById(
      "zmmtg-root"
    ).style.visibility = "hidden");
  }, []);
  const handleZoomOauht = () => {
    axios
      .post("http://localhost:4000/api/newmeeting", {
        email: email,
      })
      .then((res) => {
        console.log("...res", res);
        axios
          .post("http://localhost:4000/api/create_meeting", {
            userId: res.data.host_id,
          })
          .then((data) => {
            console.log("create_meeting", data);
            setClientData(data.data);
            setIsCreated(true);
          });
      })
      .catch((error) => console.log("...error", error));
    // fetch("http://localhost:4000/api/newmeeting", {
    //   method: "POST",
    //   body: JSON.stringify({ email: "muhammad.arshaq@koderlabs.com" }),
    // })
    //   .then(function (res) {
    //     console.log("res...", res);
    //     return res.body;
    //   })
    //   .then((data) => console.log(data, "undefined"))
    //   .catch((err) => console.log("err", err));
  };

  return (
    <div className="App">
      <p>Test Zoom SDK Integration</p>

      {!isCreated ? (
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            width: "20%",
            padding: "1rem",
          }}
          onClick={() => handleZoomOauht()}
        >
          Create Meeting
        </button>
      ) : (
        <ZoomMeeting meetingId={clientData} />
      )}
    </div>
  );
}

export default App;
