import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ReactGA from "react-ga4";
import { isProduction } from "./utils/app-env.ts";
import * as FullStory from "@fullstory/browser";

if (isProduction()) {
  ReactGA.initialize("G-BHD752HYBC");
  FullStory.init({ orgId: "o-1RKR5Q-na1" });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
