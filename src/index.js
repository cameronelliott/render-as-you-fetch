import React, { Suspense } from "react";
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

import "./styles.css";
import { launchPeerConn } from "./fakeApi";
import { wrapPromise } from "./fakeApi";

var resource = wrapPromise(launchPeerConn());



function ProfileDetails() {
  return <h1>{resource.read().name}</h1>;
}



function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // cause disconnect at 4000 ms
    setTimeout(() => {
      console.log('PC now disconnected');
      setCount(1);
      resource = wrapPromise(launchPeerConn());
    }, 4000);
  });


  return (
    <Suspense
      fallback={<h1>Waiting for PC to connect, count={count}</h1>}
    >
      <ProfileDetails />
    </Suspense>
  );
}

const rootElement = document.getElementById(
  "root"
);
ReactDOM.createRoot(rootElement).render(
  <App />
);
