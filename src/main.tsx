import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ReactGA from "react-ga4";
import { isProduction } from "./utils/app-env.ts";

if (isProduction()) {
  ReactGA.initialize("G-BHD752HYBC");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
