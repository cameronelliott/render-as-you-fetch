import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import { fetchUser } from "./fakeApi";
import { wrapPromise } from "./fakeApi";

const resource = wrapPromise(fetchUser());



function ProfileDetails() {
  return <h1>{resource.read().name}</h1>;
}



function App() {
  return (
    <Suspense
      fallback={<h1>Loading profile...</h1>}
    >
      <ProfileDetails />
    </Suspense>
  );
}

const rootElement = document.getElementById(
  "root"
);
ReactDOM.createRoot(rootElement).render(
  <App/>
);
