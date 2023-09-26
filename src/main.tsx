import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ReactGA from "react-ga4";
import { isProduction } from "./utils/app-env.ts";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (isProduction() && GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
