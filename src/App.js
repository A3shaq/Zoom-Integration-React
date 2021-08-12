import React, { useEffect, useState } from "react";

import "./App.css";
import ZoomMeeting from "./zoomMeeting";

function App() {
  const [isCreated, setIsCreated] = useState(false);
  useEffect(() => {
    const zmmtgElement = (document.getElementById(
      "zmmtg-root"
    ).style.visibility = "hidden");
  }, []);
  const handleZoomOauht = () => {
    fetch("http://localhost:4000/api/newmeeting", {
      method: "POST",
      body: JSON.stringify({ email: "muhammad.arshaq@koderlabs.com" }),
    })
      .then(function (res) {
        return res.json();
      })
      .then((data) => console.log(data));
  };

  return (
    <div className="App">
      <p>Test Zoom SDK Integration</p>

      {!isCreated ? (
        <button onClick={() => handleZoomOauht()}>Create Meeting</button>
      ) : (
        <ZoomMeeting />
      )}
    </div>
  );
}

export default App;
